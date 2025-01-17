import { TestBed } from '@angular/core/testing';

import { TMDBDataService } from './tmdbdata.service';

describe('TMDBDataService', () => {
  let service: TMDBDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TMDBDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
