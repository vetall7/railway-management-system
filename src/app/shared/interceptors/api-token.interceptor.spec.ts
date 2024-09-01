import { HttpInterceptorFn as Type } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { apiTokenInterceptor as i } from './api-token.interceptor';

describe('apiTokenInterceptor', () => {
  const interceptor: Type = (req, next) => TestBed.runInInjectionContext(() => i(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
