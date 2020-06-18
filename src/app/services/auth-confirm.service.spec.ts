import { TestBed } from '@angular/core/testing';

import { AuthConfirmService } from './auth-confirm.service';

describe('AuthConfirmService', () => {
  let service: AuthConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
