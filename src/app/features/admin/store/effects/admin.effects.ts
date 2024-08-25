/* eslint-disable arrow-body-style */
import { inject, Injectable } from '@angular/core';
import { IDataStation, IResponseCreateStation } from '@features/admin/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, of, switchMap } from 'rxjs';

import { StationService } from '../../services/station.service';
import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
  constructor(private stationService: StationService) {}

  private actions$ = inject(Actions);

  getAllStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getStations),
      switchMap(() => this.stationService.login()),
      switchMap(() =>
        this.stationService.getStations().pipe(
          map((res) =>
            AdminActions.updateStations({
              stations: [...(res as IDataStation[])],
            }),
          ),
          catchError(() => of(AdminActions.failed())),
          finalize(() =>
            of(AdminActions.setLoadingState({ isLoading: false })),
          ),
        ),
      ),
    );
  });

  addStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.addStation),
      switchMap((req) =>
        this.stationService.createStation(req.station).pipe(
          map((res) =>
            AdminActions.addStationInStore({
              station: req.station,
              id: res as IResponseCreateStation,
            }),
          ),
          catchError(() => of(AdminActions.failed())),
          finalize(() =>
            of(AdminActions.setLoadingState({ isLoading: false })),
          ),
        ),
      ),
    );
  });

  startLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getStations, AdminActions.addStation),
      map(() => AdminActions.setLoadingState({ isLoading: true })),
    );
  });

  finishLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.updateStations, AdminActions.addStationInStore),
      map(() => AdminActions.setLoadingState({ isLoading: false })),
    );
  });
}
