import {TestBed} from '@angular/core/testing';

import {AuthConfirmService} from './auth-confirm.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';

describe('AuthConfirmService', () => {
    let service: AuthConfirmService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
               SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(AuthConfirmService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create auth confirm service', () => {
        expect(service).toBeTruthy();
    });

    it('confirm: should call http POST',  done => {
        service.confirm({email: ' teste', password: 'fewoifoajeofoa'})
            .subscribe(() => {});
        const req = httpMock.expectOne(service.api + 'confirm/');
        expect(req.request.method).toBe('POST');
        done();
    });
});
