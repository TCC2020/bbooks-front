import { TestBed } from '@angular/core/testing';

import { CadastroServiceService } from './cadastro-service.service';

describe('CadastroServiceService', () => {
  let service: CadastroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
