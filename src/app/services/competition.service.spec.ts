import {TestBed} from '@angular/core/testing';

import {CompetitionService} from './competition.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CompetitionService', () => {
    let service: CompetitionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(CompetitionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
