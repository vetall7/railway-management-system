/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataRide, ISegmentsRide } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getRide(id: number): Observable<IDataRide | string> {
    return this.http
      .get<IDataRide>(`/api/route/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  updateRide(
    routeId: number,
    rideId: number,
    data: ISegmentsRide[],
  ): Observable<ISegmentsRide | string> {
    return this.http
      .put<ISegmentsRide>(
        `/api/route/${routeId}/ride/${rideId}`,
        {
          segments: data,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
          },
        },
      )
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
