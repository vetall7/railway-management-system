import { TestBed } from '@angular/core/testing';

import { FetchTripsService } from './fetch-trips.service';

describe('FetchTripsService', () => {
  let service: FetchTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
