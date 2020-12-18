import {TestBed} from '@angular/core/testing';

import {ReviewService} from './review.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialLoginModule} from 'angularx-social-login';

describe('ReviewService', () => {
    let service: ReviewService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ]
        });
        service = TestBed.inject(ReviewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
