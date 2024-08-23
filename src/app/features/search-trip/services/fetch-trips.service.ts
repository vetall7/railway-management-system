import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { City } from '@features/search-trip/models/city';

import { TripData } from '../models/trips.model';

@Injectable({
  providedIn: 'root',
})
export class FetchTripsService {
  private readonly url = '/api/search';

  private readonly httpClient = inject(HttpClient);

  private readonly trips: WritableSignal<TripData | null> = signal(null);

  public get tripsSignal(): TripData | null {
    return this.trips();
  }

  public fetchTrips(cityFrom: City, cityTo: City, date: string): void {
    const params = new HttpParams()
      .set('fromLatitude', cityFrom.latitude)
      .set('fromLongitude', cityFrom.longitude)
      .set('toLatitude', cityTo.latitude)
      .set('toLongitude', cityTo.longitude)
      .set('date', date);

    this.httpClient.get(this.url, { params }).subscribe((trips) => {
      try {
        const tripsData = trips as TripData;
        this.trips.set(tripsData);
      } catch (error) {
        console.error('Invalid data type received', error);
      }
    });
  }
}
