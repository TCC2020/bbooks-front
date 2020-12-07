import {TestBed} from '@angular/core/testing';

import {TrackingService} from './tracking.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TrackingService', () => {
    let service: TrackingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(TrackingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
