/* eslint-disable operator-linebreak */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SingleTrip } from '@shared/models';
import { FetchCarriagesService } from '@shared/services';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTripComponent implements OnInit {
  public readonly trip = input.required<SingleTrip | null>();

  private readonly fetchCarriagesService = inject(FetchCarriagesService);

  protected readonly router = inject(Router);

  protected carriagesWithNumberOfAvailableSeats = new Map<string, number>();

  protected startTime = '';

  protected endTime = '';

  protected duration = '';

  protected startCity = '';

  protected endCity = '';

  public ngOnInit(): void {
    const trip = this.trip();
    if (trip) {
      this.carriagesWithNumberOfAvailableSeats =
        this.fetchCarriagesService.getCarriagesWithNumberOfAvailableSeats(trip);
      this.startTime = this.getStartTime();
      this.endTime = this.getEndTime();
      this.duration = this.getDuration();
      this.startCity = this.getStartCity();
      this.endCity = this.getEndCity();
    }
  }

  private getStartTime(): string {
    const trip = this.trip();
    if (trip) {
      const indexOfStartStation = trip.path.findIndex(
        (station) => station.stationId === trip.from.stationId,
      );

      return trip.schedule.segments[indexOfStartStation].time[0];
    }
    return '';
  }

  private getEndTime(): string {
    const trip = this.trip();
    if (trip) {
      const indexOfEndStation = trip.path.findIndex(
        (station) => station.stationId === trip.to.stationId,
      );

      return trip.schedule.segments[indexOfEndStation - 1].time[1];
    }
    return '';
  }

  private getDuration(): string {
    const trip = this.trip();
    if (trip) {
      const startTime = new Date(this.getStartTime());
      const endTime = new Date(this.getEndTime());
      const duration = endTime.getTime() - startTime.getTime();
      return `${Math.floor(duration / 60 / 60 / 1000)}h ${Math.floor(duration / 60 / 1000) % 60}m`;
    }
    return '';
  }

  private getStartCity(): string {
    const trip = this.trip();
    if (trip) {
      return trip.path[0].city;
    }
    return '';
  }

  private getEndCity(): string {
    const trip = this.trip();
    if (trip) {
      return trip.path[trip.path.length - 1].city;
    }
    return '';
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

  protected navigateToDetails(): void {
    const trip = this.trip();
    if (trip) {
      this.router.navigate(['/trip', trip.schedule.rideId], {
        queryParams: { from: trip.from.city, to: trip.to.city },
      });
    }
  }
}
