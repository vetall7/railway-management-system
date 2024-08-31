/* eslint-disable class-methods-use-this */
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';

import { RoutesData, SingleTrip, Station } from '../models/trips.model';

import { FetchApiDataService } from './fetch-api-data.service';
// eslint-disable-next-line import/extensions
import { FetchStationsService } from './fetch-stations.service';

@Injectable()
export class FetchTripsService {
  private readonly fetchDataService = inject(FetchApiDataService);

  private readonly fetchStations = inject(FetchStationsService);

  private routes: WritableSignal<RoutesData | null> = signal(null);

  private isNotFound: WritableSignal<boolean> = signal(false);

  public fetchTrips(
    stationFrom: Station,
    stationTo: Station,
    date: string,
  ): void {
    this.fetchDataService
      .fetchTrips(stationFrom, stationTo, date)
      .subscribe((routes) => {
        if (routes) {
          this.routes.set(routes);
          if (routes.routes.length === 0) {
            this.isNotFound.set(true);
          } else {
            this.isNotFound.set(false);
          }
        }
      });
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
