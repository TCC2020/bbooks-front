import {TestBed} from '@angular/core/testing';

import {ReviewService} from './review.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {reviewMock, reviewsMock} from '../mocks/review.model.mock';
import {of} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';

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

    it('save: should save and return expected reviews',  () => {
        const spy = jest.spyOn(service, 'save').mockReturnValue(of(reviewMock));
        service.save(reviewMock)
            .pipe(take(1))
            .subscribe(result => expect(result).toEqual(reviewMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(reviewMock);

    });

    it('save: should call http post',  () => {
        service.save(reviewMock).subscribe(() => {});
        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('POST');
    });

    it('delete: should delete and return void',  () => {
        const spy = jest.spyOn(service, 'delete').mockReturnValue(of());
        service.delete(reviewMock.id)
            .subscribe(result => expect(result).toEqual(undefined));

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(reviewMock.id);
    });

    it('delete: should call http delete',  () => {
        service.delete(reviewMock.id).subscribe(() => {});

        const req = httpMock.expectOne(api + reviewMock.id );
        expect(req.request.method).toBe('DELETE');
    });

    it('update: should update and return expected review',  () => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(reviewMock));
        service.update(reviewMock)
            .subscribe(result => expect(result).toEqual(reviewMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(reviewMock);
    });

    it('update: should call http put',  () => {
        service.update(reviewMock)
            .subscribe(() => {});

        const req = httpMock.expectOne(api + reviewMock.id );
        expect(req.request.method).toBe('PUT');
    });
    it('getAllByBook: should call getAllByBook and return expected list review',  () => {
        const spy = jest.spyOn(service, 'getAllByBook').mockReturnValue(of(reviewsMock));
        service.getAllByBook(32399928)
            .subscribe(result => expect(result).toEqual(reviewsMock));

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(32399928);
    });

    it('getAllByBook: should call http get',  () => {
        service.getAllByBook(32399928).subscribe(() => {});

        const req = httpMock.expectOne(api + 'book/' + 32399928 );
        expect(req.request.method).toBe('GET');
    });

    it('getAllByGoogleBook: should call getAllByGoogleBook and return expected list review',  () => {
        const spy = jest.spyOn(service, 'getAllByGoogleBook').mockReturnValue(of(reviewsMock));
        service.getAllByGoogleBook('32399928')
            .pipe(take(1))
            .subscribe(result => expect(result).toEqual(reviewsMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('32399928');
    });

    it('getAllByGoogleBook: should call http get',  () => {
        service.getAllByGoogleBook('32399928').subscribe(() => {});

        const req = httpMock.expectOne(api + 'google-book/' + 32399928 );
        expect(req.request.method).toBe('GET');
    });
});
