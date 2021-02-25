import {TestBed} from '@angular/core/testing';

import {ExchangeService} from './exchange.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {exchangeMock} from '../mocks/exchange.mock';
import {userMock} from '../mocks/user.model.mock';

describe('ExchangeService', () => {
    let service: ExchangeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(ExchangeService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('createExchange: should call http POST', done => {
        service.createExchange(exchangeMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('getByUserReceived: should call http GET', done => {
        service.getByUserReceived(userMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'received/user/' + userMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getByUserSent: should call http GET', done => {
        service.getByUserSent(userMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'sent/user/' + userMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('accept: should call http PUT', done => {
        service.accept(exchangeMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '/accept/'  + exchangeMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('accept: should call http PUT', done => {
        service.refuse(exchangeMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '/refuse/'  + exchangeMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('cancel: should call http PUT', done => {
        service.cancel(exchangeMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '/cancel/'  + exchangeMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });
});
