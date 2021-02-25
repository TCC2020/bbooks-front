import {TestBed} from '@angular/core/testing';

import {BookAdsService} from './book-ads.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {bookAdMock} from '../mocks/book-ad.mock';
import {userMock} from '../mocks/user.model.mock';

describe('BookAdsService', () => {
    let service: BookAdsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(BookAdsService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('create: should call http POST', done => {
        service.create(bookAdMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('create: should call http PUT', done => {
        service.update(bookAdMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('getAll: should call http GET', done => {
        service.getAll()
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getAll: should call http GET', done => {
        service.getAllByUser(userMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api +  'user/' + userMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('delete: should call http DELETE', done => {
        service.delete(bookAdMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + bookAdMock.id);
        expect(req.request.method).toBe('DELETE');
        done();
    });

    it('getById: should call http DELETE', done => {
        service.getById(bookAdMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + bookAdMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });
});
