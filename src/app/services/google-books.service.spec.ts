import {TestBed} from '@angular/core/testing';

import {GoogleBooksService} from './google-books.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GoogleBooksService', () => {
    let service: GoogleBooksService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(GoogleBooksService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
