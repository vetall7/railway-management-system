import {
  IDataPostStation,
  IDataStation,
  IResponseCreateStation,
} from '@features/admin/models';
import { createAction, props } from '@ngrx/store';

export const setLoadingState = createAction(
  '[Admin] Set loading',
  props<{ isLoading: boolean }>(),
);

export const getStations = createAction('[Admin Page] Get Stations');

export const failed = createAction('[Admin Page] Failed');

export const updateStations = createAction(
  '[Admin Page] Update Stations',
  props<{ stations: IDataStation[] }>(),
);

export const addStation = createAction(
  '[Admin Page] Add Station',
  props<{ station: IDataPostStation }>(),
);

export const addStationInStore = createAction(
  '[Admin Page] Add Stations In Store',
  props<{ station: IDataPostStation; id: IResponseCreateStation }>(),
);
