import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdminState } from '../reducers/admin.reducer';

export const selectGetAppState = createFeatureSelector<AdminState>('admin');

export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);

export const selectGetStations = createSelector(
  selectGetAppState,
  (state) => state.stations,
);

export const selectGetStationData = createSelector(selectGetAppState, (state) =>
  [...state.stations].map((el) => ({
    id: el.id,
    city: el.city,
    connectedTo: el.connectedTo,
  })),
);

export const selectGetStationLocations = createSelector(
  selectGetAppState,
  (state) =>
    [...state.stations].map((el) => ({
      lat: el.latitude,
      lng: el.longitude,
      city: el.city,
    })),
);

export const selectGetStationName = (id: number[]) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    [...state.stations]
      .filter((el) => id.includes(el.id))
      .map((el) => el.city)
      .join(' '),
  );
