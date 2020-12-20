import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';
import {environment} from '../../environments/environment';
import {of} from 'rxjs';
import {userMock, usersMock} from '../mocks/user.model.mock';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    const api = environment.api + 'users/';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SocialLoginModule
            ],
            providers: [
                AuthService,
                SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('updateUserInfo: should call http get', done => {
        const spy = jest.spyOn(service, 'updateUserInfo');
        service.updateUserInfo();
        const req = httpMock.expectOne(api + 'info/');
        expect(req.request.method).toBe('GET');
        expect(spy).toHaveBeenCalled();
        done();
    });

    it('verifyEmailForSocialLogin: should call http GET',  done => {
        service.verifyEmailForSocialLogin('teste@Teste.com').subscribe(() => {});

        const req = httpMock.expectOne(api + 'google/' + 'teste@Teste.com');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('verifyEmailForSocialLogin: should call verifyEmailForSocialLogin and return expected User',  done => {
        const spy = jest.spyOn(service, 'verifyEmailForSocialLogin').mockReturnValue(of(userMock));
        service.verifyEmailForSocialLogin('teste@Teste.com')
            .subscribe(result => {
                expect(result).toEqual(result);
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('teste@Teste.com');
                done();
            });
    });

    it('getUserName: should call http GET',  done => {
        service.getUserName('teste', '43287972428974298734').subscribe(() => {});

        const req = httpMock.expectOne(api + 'username/' + 'teste');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getUserName: should call getUserName and return expected User',  done => {
        const spy = jest.spyOn(service, 'getUserName').mockReturnValue(of(userMock));
        service.getUserName('teste', '43287972428974298734')
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('teste', '43287972428974298734');
                expect(result).toEqual(userMock);
                done();
            });
    });

    it('getAllUsers: should call getAllUsers and return expected User list',   done => {
        const spy = jest.spyOn(service, 'getAllUsers').mockReturnValue(of(usersMock));
        service.getAllUsers()
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(result).toEqual(usersMock);
                done();
            });
    });
    it('getAllUsers: should call http GET',  done => {
        service.getAllUsers().subscribe(() => {});

        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('GET');
        done();
    });

    it('update: should update and return User',  done => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(userMock));
        service.update(userMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(userMock);
                expect(result).toEqual(userMock);
                done();
            });
    });

    it('update: should call http put',  done => {
        service.update(userMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(api + userMock.id );
        expect(req.request.method).toBe('PUT');
        done();
    });
});

