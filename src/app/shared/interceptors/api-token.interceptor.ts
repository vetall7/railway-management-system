/* global window */
import { HttpInterceptorFn } from '@angular/common/http';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const { url } = req;
  const isAuth = window.localStorage.getItem('isAuthenticated') === '1';
  const token = window.localStorage.getItem('token')!;

  if (!(url.startsWith('api') || url.startsWith('/api')) || !isAuth) {
    return next(req);
  }

  const tokenReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(tokenReq);
};
