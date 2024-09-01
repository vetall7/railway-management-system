import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permissionGuard: CanActivateFn = () => {
  const router = inject(Router);
  // eslint-disable-next-line no-undef
  if (localStorage.getItem('login') !== 'admin@admin.com') {
    return router.createUrlTree(['']);
  }
  return true;
};
