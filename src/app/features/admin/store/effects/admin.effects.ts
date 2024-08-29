/* eslint-disable arrow-body-style */
import { inject, Injectable } from '@angular/core';
import {
  ICarriagesData,
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

  getAllCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getCarriages, AdminActions.updateStations),
      switchMap(() =>
        this.routeService.getCarriages().pipe(
          map((res) =>
            AdminActions.updateCarriages({
              carriages: [...(res as ICarriagesData[])],
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

  deleteRouter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.deleteRouter),
      switchMap((req) =>
        this.routeService.deleteRouter(req.id).pipe(
          map(() =>
            AdminActions.deleteRouterInStore({
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

  updateRouter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.updateRouter),
      switchMap((req) =>
        this.routeService.updateRouter(req.data).pipe(
          map(() =>
            AdminActions.updateRouterInStore({
              data: req.data,
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

  createRouter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.createRouter),
      switchMap((req) =>
        this.routeService.createRouter(req.data).pipe(
          map((res) => {
            const data: IRoutesData = {
              id: (res as IResponseCreateStation).id,
              carriages: req.data.carriages,
              path: req.data.path,
            };
            return AdminActions.createRouterInStore({
              data,
            });
          }),
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
        AdminActions.getCarriages,
        AdminActions.deleteRouter,
        AdminActions.updateRouter,
        AdminActions.createRouter,
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
        AdminActions.updateCarriages,
        AdminActions.deleteRouterInStore,
        AdminActions.updateRouterInStore,
        AdminActions.createRouterInStore,
      ),
      map(() => AdminActions.setLoadingState({ isLoading: false })),
    );
  });
}
