import {TestBed} from '@angular/core/testing';

import {ReadingTrackingService} from './reading-tracking.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ReadingTrackingService', () => {
    let service: ReadingTrackingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(ReadingTrackingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
