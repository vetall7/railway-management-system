import { TestBed } from '@angular/core/testing';

import { FetchCarriagesService } from './fetch-carriages.service';

describe('FetchCarriagesService', () => {
  let service: FetchCarriagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCarriagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
