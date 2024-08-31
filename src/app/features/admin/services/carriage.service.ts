/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataCarriages } from '@features/admin/models';
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
}
