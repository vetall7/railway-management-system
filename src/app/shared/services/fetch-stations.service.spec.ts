import { TestBed } from '@angular/core/testing';

// eslint-disable-next-line import/extensions
import { FetchStationsService } from './fetch-stations.service';

describe('SearchAutocompleteService', () => {
  let service: FetchStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
