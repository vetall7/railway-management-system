import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { SingleTrip } from '@features/search-trip/models/trips.model';
import { FetchCarriagesService } from '@features/search-trip/services/fetch-carriages.service';
import { FetchTripsService } from '@features/search-trip/services/fetch-trips.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit {
  protected readonly fetchTripsService = inject(FetchTripsService);

  protected readonly activeTabIndex = 0;

  private availableDates: string[] = [];

  private readonly fetchCarriagesService = inject(FetchCarriagesService);

  public ngOnInit(): void {
    this.fetchCarriagesService.fetchCarriages();
  }

  protected tripsByDate = computed(() => {
    const map = new Map<string, SingleTrip[]>();
    const trips = this.fetchTripsService.tripsSignal;
    if (trips) {
      trips.forEach((trip) => {
        const date = new Date(trip.schedule.segments[0].time[0])
          .setHours(0, 0, 0, 0)
          .toString();
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

  protected getAvailableDates(): string[] {
    this.availableDates = Array.from(this.tripsByDate().keys()).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
    return this.availableDates;
  }

  protected getTripsByIndexOfDate(index: number): SingleTrip[] {
    const date = this.availableDates[index];
    return this.tripsByDate().get(date) || [];
  }
}
