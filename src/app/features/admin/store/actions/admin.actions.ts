import { IDataStation } from '@features/admin/models';
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
