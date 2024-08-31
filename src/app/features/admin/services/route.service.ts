/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseCreateStation, IRoutesData } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getRoutes(): Observable<IRoutesData[] | string> {
    return this.http.get<IRoutesData[]>('/api/route').pipe(
      retry(2),
      catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
    );
  }

  deleteRouter(id: number): Observable<IRoutesData | string> {
    return this.http
      .delete<IRoutesData>(`/api/route/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  createRouter(data: IRoutesData): Observable<IResponseCreateStation | string> {
    return this.http
      .post<IResponseCreateStation>(
        '/api/route',
        {
          path: [...data.path],
          carriages: [...data.carriages],
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

  updateRouter(data: IRoutesData): Observable<IResponseCreateStation | string> {
    return this.http
      .put<IResponseCreateStation>(
        `/api/route/${data.id}`,
        {
          path: [...data.path],
          carriages: [...data.carriages],
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
