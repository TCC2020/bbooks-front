import {TestBed} from '@angular/core/testing';

import {CompetitionVoteService} from './competition-vote.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CompetitionVoteService', () => {
    let service: CompetitionVoteService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(CompetitionVoteService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
