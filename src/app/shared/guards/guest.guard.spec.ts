import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { guestGuard as g } from './guest.guard';

describe('guestGuard', () => {
  const executeGuard: CanMatchFn = (...p) => TestBed.runInInjectionContext(() => g(...p));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
