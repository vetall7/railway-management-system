/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataCarriages, IDataReq } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getCarriages(): Observable<IDataCarriages | string> {
    return this.http
      .get<IDataCarriages>('/api/carriage', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  updateCarriage(
    code: string,
    data: IDataCarriages,
  ): Observable<IDataReq | string> {
    return this.http
      .put<IDataReq>(`/api/carriage/${code}`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  createCarriage(data: IDataCarriages): Observable<IDataReq | string> {
    return this.http
      .post<IDataReq>('/api/carriage', data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  deleteCarriage(code: string): Observable<IDataReq | string> {
    return this.http
      .delete<IDataReq>(`/api/carriage/${code}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
