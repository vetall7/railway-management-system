import {
  IDataCarriages,
  IDataPostStation,
  IDataReq,
  IDataRide,
  IDataStation,
  IResponseCreateStation,
  IRoutesData,
  ISegmentsRide,
} from '@features/admin/models';
import { createAction, props } from '@ngrx/store';

export const setLoadingState = createAction(
  '[Admin] Set loading',
  props<{ isLoading: boolean }>(),
);

export const setAlertState = createAction(
  '[Admin] Set Alert',
  props<{ isAlert: boolean }>(),
);

export const getStations = createAction('[Admin Page] Get Stations');

export const getRoutes = createAction('[Admin Page] Get Routes');

export const getCarriages = createAction('[Admin Page] Get Carriages');

export const failed = createAction('[Admin Page] Failed');

export const updateStations = createAction(
  '[Admin Page] Update Stations',
  props<{ stations: IDataStation[] }>(),
);

export const updateRoutes = createAction(
  '[Admin Page] Update Routes',
  props<{ routes: IRoutesData[] }>(),
);

export const addStation = createAction(
  '[Admin Page] Add Station',
  props<{ station: IDataPostStation }>(),
);

export const addStationInStore = createAction(
  '[Admin Page] Add Station In Store',
  props<{ station: IDataPostStation; id: IResponseCreateStation }>(),
);

export const deleteStation = createAction(
  '[Admin Page] Delete Station',
  props<{ id: number }>(),
);

export const deleteStationInStore = createAction(
  '[Admin Page] Delete Station In Store',
  props<{ id: number }>(),
);

export const setShowData = createAction(
  '[Admin Page] Set Show Data',
  props<{ id: number; valueForm: string[] }>(),
);

export const updateShowData = createAction(
  '[Admin Page] Update Show Data',
  props<{ id: number }>(),
);

export const updateCarriages = createAction(
  '[Admin Page] Update Carriages',
  props<{ carriages: IDataCarriages[] }>(),
);

export const deleteRouter = createAction(
  '[Admin Page] Delete Router',
  props<{ id: number }>(),
);

export const deleteRouterInStore = createAction(
  '[Admin Page] Delete Router In Store',
  props<{ id: number }>(),
);

export const clearShowData = createAction('[Admin Page] Clear Show Data');

export const updateRouter = createAction(
  '[Admin Page] Update Router',
  props<{ data: IRoutesData }>(),
);

export const updateRouterInStore = createAction(
  '[Admin Page] Update Router In Store',
  props<{ data: IRoutesData }>(),
);

export const createRouter = createAction(
  '[Admin Page] Create Router',
  props<{ data: IRoutesData }>(),
);

export const createRouterInStore = createAction(
  '[Admin Page] Create Router In Store',
  props<{ data: IRoutesData }>(),
);

export const getRide = createAction(
  '[Admin Page] Get Ride',
  props<{ id: number }>(),
);

export const updateRide = createAction(
  '[Admin Page] Update Ride',
  props<{ data: IDataRide }>(),
);

export const updateRideData = createAction(
  '[Admin Page] Update Ride Data',
  props<{ data: ISegmentsRide[]; rideId: number; id: number }>(),
);

export const updateRideDataInStore = createAction(
  '[Admin Page] Update Ride Data In Store',
  props<{ data: ISegmentsRide[]; rideId: number }>(),
);

export const createRide = createAction(
  '[Admin Page] Create Ride',
  props<{ data: ISegmentsRide[]; id: number }>(),
);

export const createRideInStore = createAction(
  '[Admin Page] Create Ride In Store',
  props<{ data: ISegmentsRide[]; rideId: number }>(),
);

export const deleteRide = createAction(
  '[Admin Page] Delete Ride',
  props<{ roteId: number; rideId: number }>(),
);

export const deleteRideInStore = createAction(
  '[Admin Page] Delete Ride In Store',
  props<{ rideId: number }>(),
);

export const createCarriages = createAction(
  '[Admin Page] Create Carriages Data',
  props<{ carriages: IDataCarriages }>(),
);

export const createCarriagesInStore = createAction(
  '[Admin Page] Create Carriages Data In Store',
  props<{ carriages: IDataCarriages; code: IDataReq }>(),
);

export const updateCarriagesData = createAction(
  '[Admin Page] Update Carriages Data',
  props<{ data: IDataCarriages; code: IDataReq }>(),
);

export const updateCarriagesDataInStore = createAction(
  '[Admin Page] Update Carriages Data In Store',
  props<{ data: IDataCarriages; code: IDataReq }>(),
);
