import { IDataStation, IRoutesData } from '@features/admin/models';
import { createReducer, on } from '@ngrx/store';

import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
  isLoading: boolean;
  isAlert: boolean;
  stations: IDataStation[];
  routes: IRoutesData[];
}

export const initialState: AdminState = {
  isLoading: false,
  isAlert: false,
  stations: [],
  routes: [],
};

export const adminReducer = createReducer(
  initialState,
  on(
    AdminActions.setLoadingState,
    (state, { isLoading }): AdminState => ({
      ...state,
      isLoading,
    }),
  ),
  on(
    AdminActions.setAlertState,
    (state, { isAlert }): AdminState => ({
      ...state,
      isAlert,
    }),
  ),
  on(
    AdminActions.updateStations,
    (state, { stations }): AdminState => ({
      ...state,
      stations: [...stations],
    }),
  ),
  on(
    AdminActions.addStationInStore,
    (state, { station, id }): AdminState => ({
      ...state,
      stations: [
        ...state.stations,
        {
          city: station.city,
          id: id.id,
          latitude: station.latitude,
          longitude: station.longitude,
          connectedTo: station.relations.map((el) => ({ id: el })),
        },
      ],
    }),
  ),
  on(
    AdminActions.deleteStationInStore,
    (state, { id }): AdminState => ({
      ...state,
      stations: [
        state.stations.slice(
          0,
          state.stations.findIndex((el) => el.id === id),
        ),
        state.stations.slice(
          state.stations.findIndex((el) => el.id === id) + 1,
        ),
      ].flat(),
    }),
  ),
  on(
    AdminActions.updateRoutes,
    (state, { routes }): AdminState => ({
      ...state,
      routes: [...routes],
    }),
  ),
);
