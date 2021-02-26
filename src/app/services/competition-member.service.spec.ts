import { TestBed } from '@angular/core/testing';

import { CompetitionMemberService } from './competition-member.service';

describe('CompetitionMemberService', () => {
  let service: CompetitionMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
