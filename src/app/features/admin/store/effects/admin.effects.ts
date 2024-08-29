/* eslint-disable arrow-body-style */
import { inject, Injectable } from '@angular/core';
import {
  IDataStation,
  IResponseCreateStation,
  IRoutesData,
} from '@features/admin/models';
import { RouteService } from '@features/admin/services/route.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, of, switchMap } from 'rxjs';

import { StationService } from '../../services/station.service';
import * as AdminActions from '../actions/admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private stationService: StationService,
    private routeService: RouteService,
  ) {}

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

  getAllRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getRoutes, AdminActions.updateStations),
      switchMap(() =>
        this.routeService.getRoutes().pipe(
          map((res) =>
            AdminActions.updateRoutes({
              routes: [...(res as IRoutesData[])],
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

  deleteStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.deleteStation),
      switchMap((req) =>
        this.stationService.deleteStations(req.id).pipe(
          map(() =>
            AdminActions.deleteStationInStore({
              id: req.id,
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
      ofType(
        AdminActions.getStations,
        AdminActions.addStation,
        AdminActions.getRoutes,
        AdminActions.deleteStation,
      ),
      map(() => AdminActions.setLoadingState({ isLoading: true })),
    );
  });

  finishLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AdminActions.addStationInStore,
        AdminActions.updateRoutes,
        AdminActions.deleteStationInStore,
      ),
      map(() => AdminActions.setLoadingState({ isLoading: false })),
    );
  });
}
