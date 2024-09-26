/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDataRide, IResponseCreateStation, ISegmentsRide } from '@features/admin/models';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private readonly http = inject(HttpClient);

  public getRide(id: number): Observable<IDataRide | string> {
    return this.http
      .get<IDataRide>(`/api/route/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public updateRide(
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
            Authorization: `Bearer ${localStorage.getItem('token')!}`,
          },
        },
      )
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public createRide(
    routeId: number,
    data: ISegmentsRide[],
  ): Observable<IResponseCreateStation | string> {
    return this.http
      .post<IResponseCreateStation>(
        `/api/route/${routeId}/ride`,
        {
          segments: data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')!}`,
          },
        },
      )
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public deleteRide(routeId: number, rideId: number): Observable<IResponseCreateStation | string> {
    return this.http
      .delete<IResponseCreateStation>(`/api/route/${routeId}/ride/${rideId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
