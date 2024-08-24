/* eslint-disable operator-linebreak */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { SingleTrip } from '@features/search-trip/models/trips.model';

import { FetchCarriagesService } from '../../services/fetch-carriages.service';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTripComponent implements OnInit {
  public readonly trip = input.required<SingleTrip | null>();

  private readonly fetchCarriagesService = inject(FetchCarriagesService);

  protected carriagesWithNumberOfAvailableSeats = new Map<string, number>();

  protected startTime = '';

  protected endTime = '';

  protected duration = '';

  protected startCity = '';

  protected endCity = '';

  public ngOnInit(): void {
    this.carriagesWithNumberOfAvailableSeats =
      this.getCarriagesWithNumberOfAvailableSeats();
    this.startTime = this.getStartTime();
    this.endTime = this.getEndTime();
    this.duration = this.getDuration();
    this.startCity = this.getStartCity();
    this.endCity = this.getEndCity();
  }

  protected getStartTime(): string {
    const trip = this.trip();
    if (trip) {
      return trip.schedule.segments[0].time[0];
    }
    return '';
  }

  protected getEndTime(): string {
    const trip = this.trip();
    if (trip) {
      return trip.schedule.segments[trip.schedule.segments.length - 1].time[1];
    }
    return '';
  }

  protected getDuration(): string {
    const trip = this.trip();
    if (trip) {
      const startTime = new Date(trip.schedule.segments[0].time[0]);
      const endTime = new Date(
        trip.schedule.segments[trip.schedule.segments.length - 1].time[1],
      );
      const duration = endTime.getTime() - startTime.getTime();
      return `${Math.floor(duration / 60 / 60 / 1000)}h ${Math.floor(duration / 60 / 1000) % 60}m`;
    }
    return '';
  }

  protected getStartCity(): string {
    const trip = this.trip();
    if (trip) {
      return trip.path[0].city;
    }
    return '';
  }

  protected getEndCity(): string {
    const trip = this.trip();
    if (trip) {
      return trip.path[trip.path.length - 1].city;
    }
    return '';
  }

  protected getAllOccupiedSeats(): number[] {
    const trip = this.trip();
    const occupiedSeats = [];
    if (trip) {
      const indexOfStartStation = trip.path.findIndex(
        (station) => station.stationId === trip.from.stationId,
      );
      const indexOfEndStation = trip.path.findIndex(
        (station) => station.stationId === trip.to.stationId,
      );
      for (let i = indexOfStartStation; i < indexOfEndStation; i += 1) {
        const occupiedSeatsInSegment = trip.schedule.segments[i].occupiedSeats;
        if (occupiedSeatsInSegment) {
          occupiedSeats.push(...occupiedSeatsInSegment);
        }
      }
    }
    return occupiedSeats;
  }

  protected getCarriagesWithNumberOfAvailableSeats(): Map<string, number> {
    const trip = this.trip();
    const carriagesWithNumberOfAvailableSeats = new Map<string, number>();
    const allOccupiedSeats = this.getAllOccupiedSeats();
    const carriagesWithNumberOfSeats =
      this.fetchCarriagesService.carriagesWithNumberOfSeats();

    if (trip) {
      const allCariages = trip.carriages;
      let currentCarriageStartIndex = 0;
      allCariages.forEach((carriage) => {
        const numberOfSeats = carriagesWithNumberOfSeats.get(carriage);
        if (numberOfSeats) {
          const numberOfAvailableSeats =
            numberOfSeats -
            allOccupiedSeats.slice(
              currentCarriageStartIndex,
              currentCarriageStartIndex + numberOfSeats,
            ).length;
          carriagesWithNumberOfAvailableSeats.set(
            carriage,
            numberOfAvailableSeats,
          );
          currentCarriageStartIndex += numberOfSeats;
        }
      });
    }
    return carriagesWithNumberOfAvailableSeats;
  }

  protected getPrice(carriage: string): number {
    const trip = this.trip();
    if (trip) {
      let price = 0;
      const indexOfStartStation = trip.path.findIndex(
        (station) => station.stationId === trip.from.stationId,
      );
      const indexOfEndStation = trip.path.findIndex(
        (station) => station.stationId === trip.to.stationId,
      );

      for (let i = indexOfStartStation; i < indexOfEndStation; i += 1) {
        const segmentPrice = trip.schedule.segments[i].price[carriage];
        if (segmentPrice) {
          price += segmentPrice;
        }
      }
      return price;
    }
    return 0;
  }
}
