/* eslint-disable arrow-body-style */
import { inject, Injectable } from '@angular/core';
import { IDataStation } from '@features/admin/models';
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

  startLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.getStations),
      map(() => AdminActions.setLoadingState({ isLoading: true })),
    );
  });

  finishLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AdminActions.updateStations),
      map(() => AdminActions.setLoadingState({ isLoading: false })),
    );
  });
}
