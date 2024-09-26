/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponseCreateStation, IRoutesData } from '@features/admin/models';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly http = inject(HttpClient);

  public getRoutes(): Observable<IRoutesData[] | string> {
    return this.http.get<IRoutesData[]>('/api/route').pipe(
      retry(2),
      catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
    );
  }

  public deleteRouter(id: number): Observable<IRoutesData | string> {
    return this.http
      .delete<IRoutesData>(`/api/route/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public createRouter(data: IRoutesData): Observable<IResponseCreateStation | string> {
    return this.http
      .post<IResponseCreateStation>(
        '/api/route',
        {
          path: [...data.path],
          carriages: [...data.carriages],
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

  public updateRouter(data: IRoutesData): Observable<IResponseCreateStation | string> {
    return this.http
      .put<IResponseCreateStation>(
        `/api/route/${data.id}`,
        {
          path: [...data.path],
          carriages: [...data.carriages],
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
