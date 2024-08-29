/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoutesData } from '@features/admin/models';
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
}
