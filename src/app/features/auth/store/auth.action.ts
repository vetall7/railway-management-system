import { createAction, props } from '@ngrx/store';

import { ApiError, AuthPayload, AuthRes } from '../models/auth.model';

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ payload: AuthPayload }>(),
);
export const signIn = createAction(
  '[Auth] Sign In',
  props<{ payload: AuthPayload }>(),
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ response: AuthRes }>(),
);
export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: ApiError }>(),
);
