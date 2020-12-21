import {TestBed} from '@angular/core/testing';

import {CDNService} from './cdn.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CDNService', () => {
    let service: CDNService;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(CDNService);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
