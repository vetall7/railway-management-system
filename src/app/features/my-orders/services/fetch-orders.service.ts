import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { OrderResponse } from '@features/my-orders/models';
import { FetchStationsService } from '@shared/services';

import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root',
})
export class FetchOrdersService {
  private readonly fetchStationsService = inject(FetchStationsService);

  private readonly orderResponse: WritableSignal<OrderResponse[]> = signal([]);

  private readonly fetchDataService = inject(FetchDataService);

  public fetchOrders(): void {
    this.fetchStationsService.fetchStations();
    this.fetchDataService.fetchAllOrders().subscribe((orders) => {
      this.orderResponse.set(orders);
    });
  }

  public getOrders = computed(() => {
    const orderResponse = this.orderResponse();
    if (orderResponse.length > 0) {
      return orderResponse;
    }
    return [];
  });

  public getStartAndEndStations(order: OrderResponse): [string, string] {
    const startStation = this.fetchStationsService.getCityById(order.path[0]);
    const endStation = this.fetchStationsService.getCityById(order.path[0]);
    if (!startStation || !endStation) {
      throw new Error('City not found');
    }
    return [startStation.city, endStation.city];
  }
}
