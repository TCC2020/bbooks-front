import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
