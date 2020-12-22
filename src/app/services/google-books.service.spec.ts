import {TestBed} from '@angular/core/testing';

import {GoogleBooksService} from './google-books.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {tagMock} from '../mocks/tag.model.mock';
import {bookMock} from '../mocks/book.model.mock';

describe('GoogleBooksService', () => {
    let service: GoogleBooksService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(GoogleBooksService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create google books service', () => {
        expect(service).toBeTruthy();
    });

    it('searchByName: should call http GET',  done => {
        service.searchByName(bookMock.title).subscribe(() => {});
        const req = httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=' +  bookMock.title);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('searchByName: should call http GET',  done => {
        service.searchByNamePagination(bookMock.title, 10, 0).subscribe(() => {});
        const req = httpMock.expectOne(
            'https://www.googleapis.com/books/v1/volumes?maxResults=' + 10 + '&q=' + bookMock.title + '&startIndex=' + 0);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getById: should call http GET',  done => {
        service.getById(bookMock.id).subscribe(() => {});
        const req = httpMock.expectOne('https://www.googleapis.com/books/v1/volumes/' +  bookMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });
});
