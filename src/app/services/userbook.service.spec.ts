import {TestBed} from '@angular/core/testing';

import {UserbookService} from './userbook.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../mocks/google.provide.mock';
import {of} from 'rxjs';
import {reviewMock} from '../mocks/review.model.mock';
import {take} from 'rxjs/operators';
import {userbookMock, userbooksMock} from '../mocks/userbook.model.mock';
import {environment} from '../../environments/environment';
import {BookStatus} from '../models/enums/BookStatus.enum';
import {profileMock} from '../mocks/profile.model.mock';

describe('UserbookService', () => {
    let service: UserbookService;
    let httpMock: HttpTestingController;
    const api = environment.api + 'bookcases/';


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                SocialLoginModule
            ],
            providers: [
                SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(UserbookService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('save: should save and return expected Userbook',  () => {
        const spy = jest.spyOn(service, 'save').mockReturnValue(of(userbookMock));
        service.save(userbookMock)
            .subscribe(result => expect(result).toEqual(userbookMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userbookMock);

    });

    it('save: should call http POST',  () => {
        service.save(userbookMock).subscribe(() => {});
        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('POST');
    });

    it('update: should update and return expected Userbook',  () => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(userbookMock));
        service.update(userbookMock)
            .subscribe(result => expect(result).toEqual(userbookMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userbookMock);

    });

    it('update: should call http PUT',  () => {
        service.update(userbookMock).subscribe(() => {});
        const req = httpMock.expectOne(api);
        expect(req.request.method).toBe('PUT');
    });

    it('getById: should getbyd and return expected Userbook',  () => {
        const spy = jest.spyOn(service, 'getById').mockReturnValue(of(userbookMock));
        service.getById(userbookMock.id)
            .subscribe(result => expect(result).toEqual(userbookMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userbookMock.id);

    });

    it('getById: should call http GET',  () => {
        service.getById(userbookMock.id).subscribe(() => {});
        const req = httpMock.expectOne(api + userbookMock.id);
        expect(req.request.method).toBe('GET');
    });

    it('changeStatus: should update status and return expected Userbook',  () => {
        const spy = jest.spyOn(service, 'changeStatus').mockReturnValue(of(userbookMock));
        service.changeStatus(BookStatus.LIDO)
            .subscribe(result => expect(result).toEqual(userbookMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(BookStatus.LIDO);

    });

    it('changeStatus: should call http PUT',  () => {
        service.changeStatus(BookStatus.LIDO).subscribe(() => {});
        const req = httpMock.expectOne(api + 'status');
        expect(req.request.method).toBe('PUT');
    });

    it('getAllByProfile: should getbyd and return expected list of Userbook',  () => {
        const spy = jest.spyOn(service, 'getAllByProfile').mockReturnValue(of(userbooksMock));
        service.getAllByProfile(profileMock.id)
            .subscribe(result => expect(result).toEqual(userbooksMock));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(profileMock.id);

    });

    it('getById: should call http GET',  () => {
        service.getAllByProfile(profileMock.id).subscribe(() => {});
        const req = httpMock.expectOne(api + 'profile/' + profileMock.id);
        expect(req.request.method).toBe('GET');
    });
});
