import { TestBed } from '@angular/core/testing';

import { NyTimesService } from './ny-times.service';

describe('NyTimesService', () => {
  let service: NyTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NyTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
