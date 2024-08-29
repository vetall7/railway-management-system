/* global window */
import { CanMatchFn } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  let isLoggedIn = true;
  if (
    // eslint-disable-next-line operator-linebreak
    window.localStorage.getItem('isAuthenticated') === '1' &&
    window.localStorage.getItem('token')
  ) {
    isLoggedIn = true;
  }
  return isLoggedIn;
};
