import { IDataFormStation } from '@features/admin/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdminState } from '../reducers/admin.reducer';

export const selectGetAppState = createFeatureSelector<AdminState>('admin');

export const selectGetIsLoading = createSelector(
  selectGetAppState,
  (state) => state.isLoading,
);

export const selectGetIsAlert = createSelector(
  selectGetAppState,
  (state) => state.isAlert,
);

export const selectGetStations = createSelector(
  selectGetAppState,
  (state) => state.stations,
);

export const selectGetRoutes = createSelector(
  selectGetAppState,
  (state) => state.routes,
);

export const selectGetShowData = createSelector(
  selectGetAppState,
  (state) => state.showData,
);

export const selectGetCarriagesData = createSelector(
  selectGetAppState,
  (state) => state.carriages,
);

export const selectGetStationData = createSelector(
  selectGetAppState,
  (state): IDataFormStation[] =>
    [...state.stations].map((el) => ({
      id: el.id,
      city: el.city,
      connectedTo: el.connectedTo,
      lat: el.latitude,
      lon: el.longitude,
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

export const selectCheckRouterActive = (id: number) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    new Set([...state.routes].map((el) => el.path).flat()).has(id),
  );

export const selectGetStationNameForRoute = (id: number) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    [...state.routes]
      .find((el) => el.id === id)
      ?.path.map((el) => [...state.stations].find((val) => val.id === el)?.city)
      .join(' - '),
  );

export const selectGetCarriageForRoute = (id: number) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    [...state.routes]
      .find((el) => el.id === id)
      ?.carriages.map(
        (el) => [...state.carriages].find((val) => val.code === el)?.name,
      )
      .join(' - '),
  );

export const selectGetRouterId = (id: number) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    state.routes.find((el) => el.id === id),
  );

export const selectGetRide = createSelector(
  selectGetAppState,
  (state) => state.ride,
);

export const selectGetRideStation = createSelector(selectGetAppState, (state) =>
  state.ride.path
    .map((el) => state.stations.find((val) => val.id === el)?.city)
    .slice(0, -1),
);

export const selectGetRideCarriages = createSelector(
  selectGetAppState,
  (state) => ({
    price: Object.fromEntries(
      state.ride.carriages
        .map((el) => state.carriages.find((val) => val.code === el)?.name)
        .map((el) => [el, -1]),
    ),
  }),
);

export const selectCheckCarriagesName = (name: string) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    state.carriages.map((el) => el.name).includes(name),
  );

export const selectCheckCarriages = (name: string) =>
  createSelector(selectGetAppState, (state: AdminState) =>
    new Set(state.routes.map((el) => el.carriages).flat()).has(name),
  );
