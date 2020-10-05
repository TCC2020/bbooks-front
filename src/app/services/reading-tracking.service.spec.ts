import { TestBed } from '@angular/core/testing';

import { ReadingTrackingService } from './reading-tracking.service';

describe('ReadingTrackingService', () => {
  let service: ReadingTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
