import {TestBed} from '@angular/core/testing';

import {FeedGenericService} from './feed-generic.service';

describe('FeedGenericService', () => {
    let service: FeedGenericService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeedGenericService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
