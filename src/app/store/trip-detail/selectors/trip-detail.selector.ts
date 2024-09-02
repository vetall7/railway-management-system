import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITripDetailState } from '../models';
import { tripDetailFeatureToken } from '../tokens';

export const selectTripDetail = createFeatureSelector<ITripDetailState>(
  tripDetailFeatureToken,
);

export const selectRideData = createSelector(
  selectTripDetail,
  (state) => state.rideData,
);

export const selectError = createSelector(
  selectTripDetail,
  (state) => state.error,
);
