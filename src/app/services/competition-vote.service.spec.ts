import { TestBed } from '@angular/core/testing';

import { CompetitionVoteService } from './competition-vote.service';

describe('CompetitionVoteService', () => {
  let service: CompetitionVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
