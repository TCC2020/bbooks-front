import { TestBed } from '@angular/core/testing';

import { UserbookService } from './userbook.service';

describe('UserbookService', () => {
  let service: UserbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
