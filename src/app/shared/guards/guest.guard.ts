/* global window */
import { CanMatchFn } from '@angular/router';

export const guestGuard: CanMatchFn = () => {
  let isGuest = true;
  if (
    // eslint-disable-next-line operator-linebreak
    window.localStorage.getItem('isAuthenticated') === '1'
  ) {
    isGuest = false;
  }
  return isGuest;
};
