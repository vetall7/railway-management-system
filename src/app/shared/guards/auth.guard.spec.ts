import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { authGuard as a } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanMatchFn = (...gp) => TestBed.runInInjectionContext(() => a(...gp));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
