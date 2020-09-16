import { TestBed } from '@angular/core/testing';

import { CDNService } from './cdn.service';

describe('CDNService', () => {
  let service: CDNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CDNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
