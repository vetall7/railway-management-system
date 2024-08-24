/* eslint-disable class-methods-use-this */
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ZodError } from 'zod';

import { RoutesData, SingleTrip, Station } from '../models/trips.model';

import { SearchAutocompleteService } from './search-autocomplete.service';

@Injectable()
export class FetchTripsService {
  private readonly url = '/api/search';

  private readonly httpClient = inject(HttpClient);

  private readonly searchAutocompleteService = inject(
    SearchAutocompleteService,
  );

  private readonly trips: WritableSignal<SingleTrip[] | null> = signal(null);

  private isNotFound = false;

  private isAlreadyRequested = false;

  public getIsNotFound(): boolean {
    return this.isNotFound;
  }

  public getIsAlreadyRequested(): boolean {
    return this.isAlreadyRequested;
  }

  public get tripsSignal(): SingleTrip[] | null {
    return this.trips();
  }

  public fetchTrips(
    stationFrom: Station,
    stationTo: Station,
    date: string,
  ): void {
    const params = new HttpParams()
      .set('fromLatitude', stationFrom.geolocation.latitude)
      .set('fromLongitude', stationFrom.geolocation.longitude)
      .set('toLatitude', stationTo.geolocation.latitude)
      .set('toLongitude', stationTo.geolocation.longitude)
      .set('date', date);

    this.httpClient.get(this.url, { params }).subscribe((trips) => {
      try {
        const tripsData = new RoutesData(trips as RoutesData);
        if (tripsData.routes.length === 0) {
          this.isNotFound = true;
          return;
        }
        this.isNotFound = false;
        this.isAlreadyRequested = true;
        this.trips.set(this.getAllSingleTrips(tripsData));
      } catch (error) {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
        } else {
          console.error('Invalid data type received', error);
        }
      }
    });
  }

  public getAllSingleTrips(routesDetails: RoutesData): SingleTrip[] {
    const singleTrips: SingleTrip[] = [];
    routesDetails.routes.forEach((route) => {
      route.schedule.forEach((schedule) => {
        const singleTrip = new SingleTrip({
          path: this.getCitiesByIds(route.path),
          carriages: route.carriages,
          from: routesDetails.from,
          to: routesDetails.to,
          schedule,
        });
        singleTrips.push(singleTrip);
      });
    });
    return singleTrips;
  }

  private getCitiesByIds(ids: number[]): Station[] {
    return ids.map((id) => {
      const station = this.searchAutocompleteService.getCityById(id);
      if (!station) {
        throw new Error(`Station with id ${id} not found`);
      }
      return station;
    });
  }
}
