/* eslint-disable indent */
import {
  IDataCarriages,
  IDataRide,
  IDataStation,
  IRoutesData,
} from '@features/admin/models';
import { createReducer, on } from '@ngrx/store';

import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
  isLoading: boolean;
  isAlert: boolean;
  stations: IDataStation[];
  showData: IDataStation[][];
  routes: IRoutesData[];
  carriages: IDataCarriages[];
  ride: IDataRide;
}

export const initialState: AdminState = {
  isLoading: false,
  isAlert: false,
  stations: [],
  routes: [],
  showData: [],
  carriages: [],
  ride: {
    id: 0,
    path: [],
    carriages: [],
    schedule: [],
  },
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
      isAlert: false,
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
    AdminActions.deleteStation,
    (state): AdminState => ({
      ...state,
      isAlert: false,
    }),
  ),
  on(
    AdminActions.deleteRouterInStore,
    (state, { id }): AdminState => ({
      ...state,
      routes: [state.routes.filter((el) => el.id !== id)].flat(),
    }),
  ),
  on(
    AdminActions.updateRoutes,
    (state, { routes }): AdminState => ({
      ...state,
      routes: [...routes],
    }),
  ),
  on(
    AdminActions.setShowData,
    (state, { id, valueForm }): AdminState => ({
      ...state,
      showData:
        id === 0
          ? [[...state.stations]]
          : [
              ...state.showData,
              (state.stations
                .find((el) => el.id === Number(valueForm![id - 1]))!
                .connectedTo.map((el) => el.id)
                .map((el) => state.stations.find((a) => a.id === el))
                .filter(
                  (el) =>
                    // eslint-disable-next-line operator-linebreak
                    !valueForm.slice(0, id)?.includes(String(el?.id)) ||
                    el?.id === Number(valueForm![id]),
                ) as IDataStation[])!,
            ],
    }),
  ),
  on(
    AdminActions.updateShowData,
    (state, { id }): AdminState => ({
      ...state,
      showData: state.showData.slice(0, id + 1),
    }),
  ),
  on(
    AdminActions.clearShowData,
    (state): AdminState => ({
      ...state,
      showData: [state.showData[0]],
    }),
  ),
  on(
    AdminActions.updateCarriages,
    (state, { carriages }): AdminState => ({
      ...state,
      carriages: [...carriages],
    }),
  ),
  on(
    AdminActions.updateRouterInStore,
    (state, { data }): AdminState => ({
      ...state,
      routes: [
        ...state.routes.slice(
          0,
          state.routes.findIndex((el) => el.id === data.id),
        ),
        data,
        ...state.routes.slice(
          state.routes.findIndex((el) => el.id === data.id) + 1,
        ),
      ],
    }),
  ),
  on(
    AdminActions.createRouterInStore,
    (state, { data }): AdminState => ({
      ...state,
      routes: [...state.routes, data],
    }),
  ),
  on(
    AdminActions.updateRide,
    (state, { data }): AdminState => ({
      ...state,
      ride: data,
    }),
  ),
  on(
    AdminActions.updateRideDataInStore,
    (state, { data, rideId }): AdminState => ({
      ...state,
      ride: {
        ...state.ride,
        schedule: state.ride.schedule.map((el) => {
          if (el.rideId === rideId) {
            return {
              rideId,
              segments: data,
            };
          }
          return el;
        }),
      },
    }),
  ),
  on(
    AdminActions.deleteRideInStore,
    (state, { rideId }): AdminState => ({
      ...state,
      ride: {
        ...state.ride,
        schedule: state.ride.schedule.filter((el) => el.rideId !== rideId),
      },
    }),
  ),
  on(
    AdminActions.createRideInStore,
    (state, { data, rideId }): AdminState => ({
      ...state,
      ride: {
        ...state.ride,
        schedule: [...state.ride.schedule, { rideId, segments: data }],
      },
    }),
  ),
  on(
    AdminActions.createCarriagesInStore,
    (state, { carriages, code }): AdminState => ({
      ...state,
      carriages: [
        ...state.carriages,
        {
          code: code.code,
          leftSeats: carriages.leftSeats,
          name: carriages.name,
          rightSeats: carriages.rightSeats,
          rows: carriages.rows,
        },
      ],
    }),
  ),
  on(
    AdminActions.updateCarriagesDataInStore,
    (state, { data, code }): AdminState => ({
      ...state,
      carriages: [
        ...state.carriages.map((el) => {
          if (el.code === code.code) {
            return {
              code: code.code,
              leftSeats: data.leftSeats,
              name: data.name,
              rightSeats: data.rightSeats,
              rows: data.rows,
            };
          }
          return el;
        }),
      ],
    }),
  ),
  on(
    AdminActions.deleteCarriages,
    (state): AdminState => ({
      ...state,
      isAlert: false,
    }),
  ),
  on(
    AdminActions.deleteCarriagesInStore,
    (state, { code }): AdminState => ({
      ...state,
      carriages: [...state.carriages.filter((el) => el.code !== code.code)],
    }),
  ),
);
