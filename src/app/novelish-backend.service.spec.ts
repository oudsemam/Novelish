import { TestBed } from '@angular/core/testing';

import { NovelishBackendService } from './novelish-backend.service';

describe('NovelishBackendService', () => {
  let service: NovelishBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelishBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
