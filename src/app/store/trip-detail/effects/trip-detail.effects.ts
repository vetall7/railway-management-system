import { inject, Injectable } from '@angular/core';
import { IRideInformation } from '@features/search-trip/models';
import { SearchTripDetailService } from '@features/search-trip/services/search-trip-detail.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TripDetailActions } from '../actions';

@Injectable()
export class TripDetailEffects {
  private readonly actions$ = inject(Actions);

  private readonly searchTripDetail = inject(SearchTripDetailService);

  loadRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripDetailActions.rideLoaded),
      switchMap(({ id }) => {
        return this.searchTripDetail.getRideInformation(id).pipe(
          map((rideData: IRideInformation) => {
            return TripDetailActions.rideLoadedSuccess({ rideData });
          }),
          catchError((error) =>
            of(TripDetailActions.rideLoadFailure({ error })),
          ),
        );
      }),
    );
  });
}
