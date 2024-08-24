import { IDataStation } from '@features/admin/models';
import { createReducer, on } from '@ngrx/store';

import * as AdminActions from '../actions/admin.actions';

export interface AdminState {
  isLoading: boolean;
  stations: IDataStation[];
}

export const initialState: AdminState = {
  isLoading: false,
  stations: [],
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
    AdminActions.updateStations,
    (state, { stations }): AdminState => ({
      ...state,
      stations: [...stations],
    }),
  ),
);
