import { TestBed } from '@angular/core/testing';

import { PublicProfileService } from './public-profile.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('PublicProfileService', () => {
  let service: PublicProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(PublicProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
