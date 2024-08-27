/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IDataPostStation,
  IDataStation,
  IResponseCreateStation,
} from '@features/admin/models';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

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
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
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
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
          },
        },
      )
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  login(): Observable<{ token: string } | string> {
    return this.http
      .post<{ token: string }>('/api/signin', {
        email: 'admin@admin.com',
        password: 'my-password',
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', JSON.stringify(res.token));
        }),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
