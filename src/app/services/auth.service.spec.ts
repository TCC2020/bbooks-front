import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';
import {userMock} from '../mocks/user.model.mock';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const loginTo = {
        email: 'test@teste.com',
        password: 'dsfaewfsfdaesf',
        keepLogin: ''
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SocialLoginModule
            ],
            providers: [
                SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('login: should call http POST', done => {
        service.login(loginTo)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'login');
        expect(req.request.method).toBe('POST');
        done();
    });

    it('loginToken: should call http POST', done => {
        service.loginToken(loginTo)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'login/token');
        expect(req.request.method).toBe('POST');
        done();
    });

    it('saveByGoogle: should call http POST', done => {
        service.saveByGoogle(userMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'login/google');
        expect(req.request.method).toBe('POST');
        done();
    });

    it('sendResetPassEmail: should call http POST', done => {
        service.sendResetPassEmail(loginTo)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'reset-pass');
        expect(req.request.method).toBe('POST');
        done();
    });


    it('getByToken: should call http GET', done => {
        service.getByToken(userMock.token)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'reset-pass/' + userMock.token);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('resetPass: should call http PUT', done => {
        service.resetPass(loginTo)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'reset-pass/');
        expect(req.request.method).toBe('PUT');
        done();
    });


    it('authenticate: keep login true', done => {
        service.authenticate(userMock, true);
        expect(service.getUser()).toEqual(userMock);
        expect(service.getToken()).toEqual(userMock.token);
        done();
    });

    it('authenticate: keep login false', done => {
        service.authenticate(userMock, false);
        expect(sessionStorage.getItem('user')).toEqual(JSON.stringify(userMock));
        expect(sessionStorage.getItem('token')).toEqual(userMock.token);
        done();
    });

    it('setUserRegister', done => {
        service.setUserRegister(userMock);
        expect(service.getUserRegister()).toEqual(userMock);
        done();
    });

    it('logout', done => {
        service.authenticate(userMock, true);
        expect(sessionStorage.getItem('user')).toEqual(JSON.stringify(userMock));
        expect(sessionStorage.getItem('token')).toEqual(userMock.token);

        service.logout();
        expect(service.getUser()).toEqual(null);
        expect(service.getToken()).toEqual(null);
        done();
    });
});
