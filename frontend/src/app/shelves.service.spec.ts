import { TestBed } from '@angular/core/testing';

import { ShelvesService } from './shelves.service';

describe('ShelvesService', () => {
  let service: ShelvesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShelvesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
