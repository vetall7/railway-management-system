/* global window */
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

import * as AuthActions from './auth.action';

export const signUp$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap((action) =>
        authService.signup(action.payload).pipe(
          map((response) => AuthActions.authSuccess({ response })),
          catchError((error) => of(AuthActions.authFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const signIn$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap((action) =>
        authService.signin(action.payload).pipe(
          map((response) => {
            window.localStorage.setItem('token', response.token ?? '');
            window.localStorage.setItem('login', action.payload.email ?? '');
            window.localStorage.setItem(
              'isAuthenticated',
              response.token!.length > 0 ? '1' : '0',
            );
            return AuthActions.authSuccess({ response });
          }),
          catchError((error) => of(AuthActions.authFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
