import {TestBed} from '@angular/core/testing';

import {ReadingTrackingService} from './reading-tracking.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {readingsTrackingMock, readingTrackingMock} from '../mocks/tracking.model';

describe('ReadingTrackingService', () => {
    let service: ReadingTrackingService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(ReadingTrackingService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('save: should save and return expected ReadingTracking',  done => {
        const spy = jest.spyOn(service, 'save').mockReturnValue(of(readingTrackingMock));
        service.save(readingTrackingMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(readingTrackingMock);
                expect(result).toEqual(readingTrackingMock);
                done();
            });
    });

    it('save: should call http POST',  done => {
        service.save(readingTrackingMock)
            .subscribe(() => {});
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('delete: should call http DELETE',  done => {
        service.delete(readingTrackingMock.id).subscribe(() => {});

        const req = httpMock.expectOne(service.api + readingTrackingMock.id );
        expect(req.request.method).toBe('DELETE');
        done();
    });

    it('update: should update and return expected ReadingTracking',  done => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(readingTrackingMock));
        service.update(readingTrackingMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(readingTrackingMock);
                expect(result).toEqual(readingTrackingMock);
                done();
            });
    });

    it('update: should call http put',  done => {
        service.update(readingTrackingMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + readingTrackingMock.id );
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('getAllByUserBook: should call getAllByBook and return expected list ReadingTracking',  done => {
        const spy = jest.spyOn(service, 'getAllByUserBook').mockReturnValue(of(readingsTrackingMock));
        service.getAllByUserBook(32399928)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(32399928);
                expect(result).toEqual(readingsTrackingMock);
                done();
            });
    });

    it('getAllByUserBook: should call http get',  done => {
        service.getAllByUserBook(32399928)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'book/' + 32399928 );
        expect(req.request.method).toBe('GET');
        done();
    });
});
