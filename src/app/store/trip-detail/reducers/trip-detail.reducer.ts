import { createReducer, on } from '@ngrx/store';

import { TripDetailActions } from '../actions';
import { ITripDetailState } from '../models';
import { tripInitialState } from '../states';

export const tripDetailReducer = createReducer(
  tripInitialState,
  on(
    TripDetailActions.rideLoadedSuccess,
    (state, { rideData }): ITripDetailState => ({
      ...state,
      rideData,
    }),
  ),
  on(
    TripDetailActions.rideLoadFailure,
    (state, { error }): ITripDetailState => ({
      ...state,
      error: {
        ...error,
        isError: true,
      },
    }),
  ),
);
