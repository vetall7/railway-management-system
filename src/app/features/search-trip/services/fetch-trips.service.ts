/* eslint-disable class-methods-use-this */
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RoutesData, SingleTrip, Station } from '@shared/models';
import { FetchApiDataService, FetchStationsService } from '@shared/services';
import { lastValueFrom } from 'rxjs';
// eslint-disable-next-line import/extensions

@Injectable()
export class FetchTripsService {
  private readonly fetchDataService = inject(FetchApiDataService);

  private readonly fetchStations = inject(FetchStationsService);

  private readonly routes: WritableSignal<RoutesData | null> = signal(null);

  private readonly isNotFound: WritableSignal<boolean> = signal(false);

  private readonly isLoading: WritableSignal<boolean> = signal(false);

  public async fetchTrips(stationFrom: Station, stationTo: Station, date: string): Promise<void> {
    this.isLoading.set(true);
    const routes = await lastValueFrom(
      this.fetchDataService.fetchTrips(stationFrom, stationTo, date),
    );
    this.routes.set(routes);
    this.isLoading.set(false);
    if (!routes || routes.routes.length === 0) {
      this.isNotFound.set(true);
    } else {
      this.isNotFound.set(false);
    }
  }

  public get isLoadingSig(): WritableSignal<boolean> {
    return this.isLoading;
  }

  private trips = computed(() => {
    const routesDetails = this.routes();
    if (!routesDetails) {
      return null;
    }

    const singleTrips: SingleTrip[] = [];
    routesDetails.routes.forEach((route) => {
      route.schedule.forEach((schedule) => {
        const singleTrip = new SingleTrip({
          path: this.fetchStations.getCitiesByIds(route.path),
          carriages: route.carriages,
          from: routesDetails.from,
          to: routesDetails.to,
          schedule,
        });
        singleTrips.push(singleTrip);
      });
    });
    return singleTrips;
  });

  public get isNotFoundSig(): WritableSignal<boolean> {
    return this.isNotFound;
  }

  public get tripsSignal(): SingleTrip[] | null {
    return this.trips();
  }
}
