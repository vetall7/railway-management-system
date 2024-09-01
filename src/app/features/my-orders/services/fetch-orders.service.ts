/* eslint-disable prettier/prettier */
import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Order, OrderResponse } from '@features/my-orders/models';
import { FetchCarriagesService, FetchStationsService } from '@shared/services';
import { lastValueFrom } from 'rxjs';

import { FetchDataService } from './fetch-data.service';
import { FetchUsersService } from './fetch-users.service';

@Injectable({
  providedIn: 'root',
})
export class FetchOrdersService {
  private readonly fetchStationsService = inject(FetchStationsService);

  private readonly orderResponse: WritableSignal<OrderResponse[]> = signal([]);

  private readonly fetchDataService = inject(FetchDataService);

  private readonly fetchCarriagesService = inject(FetchCarriagesService);

  private readonly fetchUsersService = inject(FetchUsersService);

  private readonly error = signal('');

  public async fetchOrders(): Promise<void> {
    try {
      await this.fetchStationsService.fetchStations();
      await this.fetchCarriagesService.fetchCarriages();
      await this.fetchUsersService.fetchUsers();
      const orders = await lastValueFrom(
        this.fetchDataService.fetchAllOrders(),
      );
      this.orderResponse.set(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  public readonly getOrders: Signal<Order[]> = computed(() => {
    const orderResponse = this.orderResponse();

    if (orderResponse.length > 0) {
      const orders = orderResponse.map((order) => new Order({
        userName: this.getUserName(order),
        id: order.id,
        startTripStation: this.getStartAndEndStations(order)[0],
        startTripTime: this.getStartTimeAndEndTime(order)[0],
        endTripStation: this.getStartAndEndStations(order)[1],
        endTripTime: this.getStartTimeAndEndTime(order)[1],
        tripDuration: this.getTripDuration(order),
        carriageType: this.getCarriageType(order),
        seatNumber: this.getSeatNumber(order),
        carNumber: this.getCarNumber(order),
        price: this.getPrice(order),
        status: order.status,
      }));

      orders.sort((a, b) => {
        const timeA = new Date(a.startTripTime).getTime();
        const timeB = new Date(b.startTripTime).getTime();
        return timeA - timeB;
      });

      return orders;
    }

    return [];
  });

  private getUserName(order: OrderResponse): string {
    const user = this.fetchUsersService.getUserById(order.userId);
    return user ? user.name : '';
  }

  private getStartAndEndStations(order: OrderResponse): [string, string] {
    const startStation = this.fetchStationsService.getCityById(order.path[0]);
    const endStation = this.fetchStationsService.getCityById(
      order.path[order.path.length - 1],
    );
    if (!startStation || !endStation) {
      throw new Error('City not found');
    }
    return [startStation.city, endStation.city];
  }

  // eslint-disable-next-line class-methods-use-this
  private getStartTimeAndEndTime(order: OrderResponse): [string, string] {
    const startTime = order.schedule.segments[0].time[0];
    const endTime = order.schedule.segments[order.schedule.segments.length - 1].time[1];
    return [startTime, endTime];
  }

  private getTripDuration(order: OrderResponse): string {
    const [startTime, endTime] = this.getStartTimeAndEndTime(order);
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const duration = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(duration / 1000 / 60 / 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
  }

  private getCarriageType(order: OrderResponse): string {
    const carriagesWithNumberOfSeats = this.fetchCarriagesService.carriagesWithNumberOfSeats();
    const seatIndex = order.seatId;
    const allCarriages = order.carriages;
    let currentCarriageStartIndex = 0;

    const carriageType = allCarriages.find((carriage) => {
      const numberOfSeats = carriagesWithNumberOfSeats.get(carriage);
      if (numberOfSeats) {
        if (seatIndex < currentCarriageStartIndex + numberOfSeats) {
          return true;
        }
        currentCarriageStartIndex += numberOfSeats;
      }
      return false;
    }) || '';

    return carriageType;
  }

  private getSeatNumber(order: OrderResponse): string {
    const carriagesWithNumberOfSeats = this.fetchCarriagesService.carriagesWithNumberOfSeats();
    const seatIndex = order.seatId;
    const allCarriages = order.carriages;
    let currentCarriageStartIndex = 0;
    let seatNumberRelativeToCarriage = 0;

    allCarriages.find((carriage) => {
      const numberOfSeats = carriagesWithNumberOfSeats.get(carriage);
      if (numberOfSeats) {
        if (seatIndex < currentCarriageStartIndex + numberOfSeats) {
          seatNumberRelativeToCarriage = seatIndex - currentCarriageStartIndex;
          return true;
        }
        currentCarriageStartIndex += numberOfSeats;
      }
      return false;
    });

    return seatNumberRelativeToCarriage.toString();
  }

  private getCarNumber(order: OrderResponse): string {
    const carriagesWithNumberOfSeats = this.fetchCarriagesService.carriagesWithNumberOfSeats();
    const seatIndex = order.seatId;
    const allCarriages = order.carriages;
    let currentCarriageStartIndex = 0;
    let carNumber = 1;

    allCarriages.find((carriage) => {
      const numberOfSeats = carriagesWithNumberOfSeats.get(carriage);
      if (numberOfSeats) {
        if (seatIndex < currentCarriageStartIndex + numberOfSeats) {
          return true;
        }
        currentCarriageStartIndex += numberOfSeats;
        carNumber += 1;
      }
      return false;
    });

    return carNumber.toString();
  }

  private getPrice(order: OrderResponse): number {
    const carriageType = this.getCarriageType(order);
    let price = 0;
    order.schedule.segments.forEach((segment) => {
      if (segment.price[carriageType]) {
        price += segment.price[carriageType];
      }
    });
    return price;
  }

  public cancelOrder(orderId: number): void {
    this.fetchDataService.deleteOrder(orderId).subscribe({
      next: () => {
        // eslint-disable-next-line no-console
        console.log('Order canceled successfully');
      },
      error: (err: Error) => {
        this.errorSig = err.message;
      },
    });
  }

  public get errorSig(): Signal<string> {
    return this.error;
  }

  public set errorSig(value: string) {
    this.error.set(value);
  }
}
