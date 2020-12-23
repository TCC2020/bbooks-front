import {TestBed} from '@angular/core/testing';

import {ReviewService} from './review.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {reviewMock, reviewPagination, reviewsMock} from '../mocks/review.model.mock';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Profile} from '../models/profileTO.model';

describe('ReviewService', () => {
    let service: ReviewService;
    let httpMock: HttpTestingController;
    const api = environment.api + 'review/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ]
        });
        service = TestBed.inject(ReviewService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('save: should save and return expected reviews',  done => {
        const spy = jest.spyOn(service, 'save').mockReturnValue(of(reviewMock));
        service.save(reviewMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(reviewMock);
                expect(result).toEqual(reviewMock);
                done();
            });
    });

    it('save: should call http post',  done => {
        service.save(reviewMock)
            .subscribe(() => {});
        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('delete: should call http delete',  done => {
        service.delete(reviewMock.id).subscribe(() => {});

        const req = httpMock.expectOne(api + reviewMock.id );
        expect(req.request.method).toBe('DELETE');
        done();
    });

    it('update: should update and return expected review',  done => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(reviewMock));
        service.update(reviewMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(reviewMock);
                expect(result).toEqual(reviewMock);
                done();
            });
    });

    it('update: should call http put',  done => {
        service.update(reviewMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + reviewMock.id );
        expect(req.request.method).toBe('PUT');
        done();
    });
    it('getAllByBook: should call getAllByBook and return expected list review',  done => {
        const spy = jest.spyOn(service, 'getAllByBook').mockReturnValue(of(reviewPagination));
        service.getAllByBook(32399928 , 22 , 22)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(32399928, 22, 22);
                expect(result).toEqual(reviewPagination);
                done();
            });
    });

    it('getAllByBook: should call http get',  done => {
        service.getAllByBook(32399928, 22, 22)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + 'book/32399928?page=22&size=22');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getAllByGoogleBook: should call getAllByGoogleBook and return expected list review',  done => {
        const spy = jest.spyOn(service, 'getAllByGoogleBook').mockReturnValue(of(reviewPagination));
        service.getAllByGoogleBook('32399928', 22, 22)
            .pipe(take(1))
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('32399928', 22, 22);
                expect(result).toEqual(reviewPagination);
                done();
            });
    });

    it('getAllByGoogleBook: should call http get',  done => {
        service.getAllByGoogleBook('32399928', 22, 22)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + 'google-book/32399928?page=22&size=22');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('mapForReviews',  done => {
        const result = service.mapForReviews(reviewsMock);
        result.forEach(r => {
            expect(r.profileTO).toBeInstanceOf(Observable);
            done();
        });
    });
});
