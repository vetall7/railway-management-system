/* eslint-disable no-undef */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDataCarriages, IDataReq } from '@features/admin/models';
import { STORAGE } from '@shared/web-storage';
import { catchError, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private readonly http = inject(HttpClient);

  private readonly storage = inject<Storage>(STORAGE);

  public getCarriages(): Observable<IDataCarriages | string> {
    return this.http
      .get<IDataCarriages>('/api/carriage', {
        headers: {
          Authorization: `Bearer ${this.storage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public updateCarriage(code: string, data: IDataCarriages): Observable<IDataReq | string> {
    return this.http
      .put<IDataReq>(`/api/carriage/${code}`, data, {
        headers: {
          Authorization: `Bearer ${this.storage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public createCarriage(data: IDataCarriages): Observable<IDataReq | string> {
    return this.http
      .post<IDataReq>('/api/carriage', data, {
        headers: {
          Authorization: `Bearer ${this.storage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }

  public deleteCarriage(code: string): Observable<IDataReq | string> {
    return this.http
      .delete<IDataReq>(`/api/carriage/${code}`, {
        headers: {
          Authorization: `Bearer ${this.storage.getItem('token')!}`,
        },
      })
      .pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => of(`Bad Promise: ${e}`)),
      );
  }
}
