import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { SingleTrip } from '@features/search-trip/models';
import {
  FetchCarriagesService,
  FetchTripsService,
} from '@features/search-trip/services';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit {
  protected readonly fetchTripsService = inject(FetchTripsService);

  private readonly fetchCarriagesService = inject(FetchCarriagesService);

  protected activeTabIndex = 0;

  private availableDates: Date[] = [];

  public ngOnInit(): void {
    this.fetchCarriagesService.fetchCarriages();
  }

  protected tripsByDate = computed(() => {
    this.resetTabIndex();
    const map = new Map<string, SingleTrip[]>();
    const trips = this.fetchTripsService.tripsSignal;
    if (trips) {
      trips.forEach((trip) => {
        const date = new Date(
          new Date(trip.schedule.segments[0].time[0]).setHours(0, 0, 0, 0),
        ).toISOString();
        if (map.has(date)) {
          const dateTrips = map.get(date);
          if (dateTrips) {
            dateTrips.push(trip);
          }
        } else {
          map.set(date, [trip]);
        }
      });
    }
    return map;
  });

  private resetTabIndex(): void {
    this.activeTabIndex = 0;
  }

  protected getAvailableDates(): Date[] {
    this.availableDates = Array.from(this.tripsByDate().keys())
      .map((dateString) => new Date(dateString))
      .sort((a, b) => a.getTime() - b.getTime());
    return this.availableDates;
  }

  protected getTripsByIndexOfDate(index: number): SingleTrip[] {
    const date = this.availableDates[index];
    const trips = this.tripsByDate().get(date.toISOString()) || [];
    return trips;
  }
}
