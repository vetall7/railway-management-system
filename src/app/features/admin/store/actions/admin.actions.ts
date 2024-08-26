import {
  ICarriagesData,
  IDataPostStation,
  IDataStation,
  IResponseCreateStation,
  IRoutesData,
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
  '[Admin Page] Update Carriages Data',
  props<{ carriages: ICarriagesData[] }>(),
);
