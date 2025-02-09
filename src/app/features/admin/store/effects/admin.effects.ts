/* eslint-disable arrow-body-style */
import { inject, Injectable } from '@angular/core';
import {
  IDataCarriages,
  IDataReq,
  IDataRide,
  IDataStation,
  IResponseCreateStation,
  IRoutesData,
} from '@features/admin/models';
import { CarriageService } from '@features/admin/services/carriage.service';
import { RideService } from '@features/admin/services/ride.service';
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
    private carriageService: CarriageService,
    private rideService: RideService,
  ) {}

  private actions$ = inject(Actions);

  getAllStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getStations, AdminActions.updateRide),
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

  getRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getRide),
      switchMap((req) =>
        this.rideService.getRide(req.id).pipe(
          map((res) =>
            AdminActions.updateRide({
              data: res as IDataRide,
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
      ofType(
        AdminActions.getRoutes,
        AdminActions.updateStations,
        AdminActions.getCarriages,
      ),
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
        this.carriageService.getCarriages().pipe(
          map((res) =>
            AdminActions.updateCarriages({
              carriages: [...(res as unknown as IDataCarriages[])],
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

  addCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.createCarriages),
      switchMap((req) =>
        this.carriageService.createCarriage(req.carriages).pipe(
          map((res) =>
            AdminActions.createCarriagesInStore({
              carriages: req.carriages,
              code: res as IDataReq,
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

  deleteCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.deleteCarriages),
      switchMap((req) =>
        this.carriageService.deleteCarriage(req.code.code).pipe(
          map(() =>
            AdminActions.deleteCarriagesInStore({
              code: req.code,
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

  deleteRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.deleteRide),
      switchMap((req) =>
        this.rideService.deleteRide(req.roteId, req.rideId).pipe(
          map(() =>
            AdminActions.deleteRideInStore({
              rideId: req.rideId,
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

  updateCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.updateCarriagesData),
      switchMap((req) =>
        this.carriageService.updateCarriage(req.code.code, req.data).pipe(
          map((res) =>
            AdminActions.updateCarriagesDataInStore({
              data: req.data,
              code: res as IDataReq,
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

  createRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.createRide),
      switchMap((req) =>
        this.rideService.createRide(req.id, req.data).pipe(
          map((res) =>
            AdminActions.createRideInStore({
              data: req.data,
              rideId: (res as IResponseCreateStation).id,
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

  updateRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.updateRideData),
      switchMap((req) =>
        this.rideService.updateRide(req.id, req.rideId, req.data).pipe(
          map(() =>
            AdminActions.updateRideDataInStore({
              data: req.data,
              rideId: req.rideId,
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
        AdminActions.getCarriages,
        AdminActions.deleteRouter,
        AdminActions.updateRouter,
        AdminActions.createRouter,
        AdminActions.getRide,
        AdminActions.updateRideData,
        AdminActions.createRide,
        AdminActions.deleteRide,
        AdminActions.createCarriages,
        AdminActions.updateCarriagesData,
        AdminActions.deleteCarriages,
      ),
      map(() => AdminActions.setLoadingState({ isLoading: true })),
    );
  });

  finishLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AdminActions.addStationInStore,
        AdminActions.deleteStationInStore,
        AdminActions.updateCarriages,
        AdminActions.deleteRouterInStore,
        AdminActions.updateRouterInStore,
        AdminActions.createRouterInStore,
        AdminActions.updateRideDataInStore,
        AdminActions.createRideInStore,
        AdminActions.deleteRideInStore,
        AdminActions.createCarriagesInStore,
        AdminActions.updateCarriagesDataInStore,
        AdminActions.deleteCarriagesInStore,
      ),
      map(() => AdminActions.setLoadingState({ isLoading: false })),
    );
  });
}
