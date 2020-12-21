import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';
import {AuthService} from './auth.service';

import {BookRecommendationService} from './book-recommendation.service';
import {GoogleBooksService} from './google-books.service';
import {UserbookService} from './userbook.service';
import {friendMock} from '../mocks/friend.model.mock';
import {bookRecomendationMock} from '../mocks/book-recomendation.model.mock';

describe('BookRecommendationService', () => {
    let service: BookRecommendationService;
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
        service = TestBed.inject(BookRecommendationService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create book recommendation service', () => {
        expect(service).toBeTruthy();
    });

    it('save: should call http POST', done => {
        service.save(bookRecomendationMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('update: should call http PUT', done => {
        service.update(bookRecomendationMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api  + bookRecomendationMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('delete: should call http DELETE', done => {
        service.delete('93939393')
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '93939393');
        expect(req.request.method).toBe('DELETE');
        done();
    });

    it('getRecommentionsSent: should call http GET', done => {
        service.getRecommentionsSent(30030303)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'sent/' + 30030303);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getRecommentionById: should call http GET', done => {
        service.getRecommentionById('30030303')
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '30030303');
        expect(req.request.method).toBe('GET');
        done();
    });
});
