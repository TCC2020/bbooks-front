import {TestBed} from '@angular/core/testing';

import {AuthorService} from './author.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthorService', () => {
    let service: AuthorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(AuthorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
