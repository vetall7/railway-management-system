/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IDataPostStation,
  IDataStation,
  IResponseCreateStation,
} from '@features/admin/models';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<IDataStation[] | string> {
    return this.http.get<IDataStation[]>('/api/station').pipe(
      retry(2),
      catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
    );
  }

  deleteStations(id: number): Observable<IDataStation[] | string> {
    return this.http
      .delete<IDataStation[]>(`/api/station/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  createStation(
    data: IDataPostStation,
  ): Observable<IResponseCreateStation | string> {
    return this.http
      .post<IResponseCreateStation>(
        '/api/station',
        {
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          relations: [...data.relations],
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
}
