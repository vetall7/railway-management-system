import { createReducer, on } from '@ngrx/store';

import { ApiError, AuthRes } from '../models/auth.model';

import * as AuthActions from './auth.action';

export interface AuthState {
  response: AuthRes | null;
  error: ApiError | null;
  isLoading: boolean;
}

export const initialAuthState: AuthState = {
  response: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.signUp,
    AuthActions.signIn,
    (state): AuthState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    AuthActions.authSuccess,
    (state, { response }): AuthState => ({
      ...state,
      isLoading: false,
      response,
      error: null,
    }),
  ),
  on(
    AuthActions.authFailure,
    (state, { error }): AuthState => ({
      ...state,
      isLoading: false,
      response: null,
      error,
    }),
  ),
);
