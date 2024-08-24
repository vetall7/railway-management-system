import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataStation } from '@features/admin/models';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, retry } from 'rxjs';

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
}
