import { TestBed } from '@angular/core/testing';

import { ReadingTargetService } from './reading-target.service';

describe('ReadingTargetService', () => {
  let service: ReadingTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
