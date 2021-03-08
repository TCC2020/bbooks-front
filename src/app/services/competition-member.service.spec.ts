import {TestBed} from '@angular/core/testing';

import {CompetitionMemberService} from './competition-member.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CompetitionMemberService', () => {
    let service: CompetitionMemberService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(CompetitionMemberService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
