import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Carriage,
  RoutesData,
  Station,
  StationArraySchema,
  StationResponse,
} from '@features/search-trip/models';
import { catchError, map, Observable } from 'rxjs';
import { ZodError } from 'zod';

@Injectable()
export class FetchApiDataService {
  private readonly urls = {
    search: '/api/search',
    station: '/api/station',
    carriage: '/api/carriage',
  };

  private readonly httpClient = inject(HttpClient);

  public fetchCarriages(): Observable<Carriage[]> {
    return this.httpClient.get<Carriage[]>(this.urls.carriage).pipe(
      map((data) => data.map((carriage) => new Carriage(carriage))),
      catchError((error) => {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
        } else {
          console.error('Invalid data type received:', error);
        }
        throw error;
      }),
    );
  }

  public fetchStations(): Observable<Station[]> {
    return this.httpClient.get<StationResponse[]>(this.urls.station).pipe(
      map((data) => {
        const validatedData = StationArraySchema.parse(data);
        return validatedData.map(
          (station) =>
            new Station({
              stationId: station.id,
              city: station.city,
              geolocation: {
                latitude: station.latitude,
                longitude: station.longitude,
              },
            }),
        );
      }),
      catchError((error) => {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
        } else {
          console.error('Invalid data type received:', error);
        }
        throw error;
      }),
    );
  }

  public fetchTrips(
    stationFrom: Station,
    stationTo: Station,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    date: string,
  ): Observable<RoutesData | null> {
    const params = new HttpParams()
      .set('fromLatitude', stationFrom.geolocation.latitude)
      .set('fromLongitude', stationFrom.geolocation.longitude)
      .set('toLatitude', stationTo.geolocation.latitude)
      .set('toLongitude', stationTo.geolocation.longitude)
      .set('time', 0); // should be date, but does not work with the current API

    return this.httpClient.get(this.urls.search, { params }).pipe(
      map((data) => new RoutesData(data as RoutesData)),
      catchError((error) => {
        if (error instanceof ZodError) {
          console.error('Validation failed:', error.errors);
        } else {
          console.error('Invalid data type received:', error);
        }
        throw error;
      }),
    );
  }
}
