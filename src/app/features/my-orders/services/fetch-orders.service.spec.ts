import { TestBed } from '@angular/core/testing';

import { FetchOrdersService } from './fetch-orders.service';

describe('FetchOrdersService', () => {
  let service: FetchOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
