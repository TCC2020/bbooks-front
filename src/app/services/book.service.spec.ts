import {TestBed} from '@angular/core/testing';

import {BookService} from './book.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';
import {UserbookService} from './userbook.service';
import {GoogleBooksService} from './google-books.service';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';
import {Author} from '../models/author.model';
import {friendMock} from '../mocks/friend.model.mock';
import {bookMock} from '../mocks/book.model.mock';
import {of} from 'rxjs';
import {readingsTrackingMock} from '../mocks/tracking.model';
import {tagsMock} from '../mocks/tag.model.mock';

describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                SocialLoginModule
            ],
            providers: [
                AuthService,
                UserbookService,
                GoogleBooksService,
                SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create book service', () => {
        expect(service).toBeTruthy();
    });


    it('save: should call http POST', done => {
        service.save(bookMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('update: should call http UPDATE', done => {
        service.update(bookMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + bookMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('getById: should call http GET',  done => {
        service.getById(32399928)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 32399928 );
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getAllTags: should call getAllTags', done => {
        const spy = jest.spyOn(service, 'getAllTags').mockReturnValue(of(tagsMock));
        service.getAllTags()
            .subscribe(() => {
                expect(spy).toHaveBeenCalled();
                done();
            });
    });

    it('convertAuthorToModel',  done => {

        const authors = [
            'lucas',
            'wendy',
            'joan',
            'jose',
        ];
        const result = service.convertAuthorToModel(authors);
        result.forEach((author, i) => {
            expect(typeof author === 'string').toBeFalsy();
            expect(author.name).toEqual(authors[i]);
        });
        done();
    });
});
