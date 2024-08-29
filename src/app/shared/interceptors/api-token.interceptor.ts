/* global window */
import { HttpInterceptorFn } from '@angular/common/http';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, headers } = req;

  if (!(url.startsWith('api') || url.startsWith('/api'))) {
    return next(req);
  }

  const tokenReq = req.clone({
    headers: headers.append(
      'Bearer',
      window.localStorage.getItem('token') ?? '',
    ),
  });

  return next(tokenReq);
};
