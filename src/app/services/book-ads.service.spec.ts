import {TestBed} from '@angular/core/testing';

import {BookAdsService} from './book-ads.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BookAdsService', () => {
    let service: BookAdsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(BookAdsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
