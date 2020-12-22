import {TestBed} from '@angular/core/testing';

import {TrackingService} from './tracking.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {readingTrackingMock} from '../mocks/tracking.model';
import {trackingMock, trackingsMock} from '../mocks/tracking.model.mock';
import {environment} from '../../environments/environment';

describe('TrackingService', () => {
    let service: TrackingService;
    let httpMock: HttpTestingController;
    const api = environment.api + 'tracking-group/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(TrackingService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should create tracking service', () => {
        expect(service).toBeTruthy();
    });
    it('save: should save and return expected ReadingTrackingTo list',  done => {
        const spy = jest.spyOn(service, 'save').mockReturnValue(of(readingTrackingMock));
        service.save(trackingMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(trackingMock);
                expect(result).toEqual(readingTrackingMock);
                done();
            });
    });

    it('save: should call http POST',  done => {
        service.save(trackingMock)
            .subscribe(() => {});
        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('getAllByUserBook: should call getAllByBook and return expected list TrackingTO',  done => {
        const spy = jest.spyOn(service, 'getAllByUserBook').mockReturnValue(of(trackingsMock));
        service.getAllByUserBook(32399928)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(32399928);
                expect(result).toEqual(trackingsMock);
                done();
            });
    });

    it('getAllByBook: should call http GET',  done => {
        service.getAllByUserBook(32399928)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + 'book/' + 32399928 );
        expect(req.request.method).toBe('GET');
        done();
    });

    it('update: should update and return expected ReadingTrackingTo list',  done => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(readingTrackingMock));
        service.update(trackingMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(trackingMock);
                expect(result).toEqual(readingTrackingMock);
                done();
            });
    });

    it('update: should call http PUT',  done => {
        service.update(trackingMock)
            .subscribe(() => {});
        const req = httpMock.expectOne(api + trackingMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('getById: should call getById and return expected  TrackingTO',  done => {
        const spy = jest.spyOn(service, 'getById').mockReturnValue(of(trackingMock));
        service.getById('32399928')
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('32399928');
                expect(result).toEqual(trackingMock);
                done();
            });
    });

    it('getById: should call http GET',  done => {
        service.getById('32399928')
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + '32399928' );
        expect(req.request.method).toBe('GET');
        done();
    });

    it('delete: should call http DELETE',  done => {
        service.delete(trackingMock.id).subscribe(() => {});

        const req = httpMock.expectOne(api + trackingMock.id );
        expect(req.request.method).toBe('DELETE');
        done();
    });
});
