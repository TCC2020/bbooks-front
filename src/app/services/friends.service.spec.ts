import {TestBed} from '@angular/core/testing';

import {FriendsService} from './friends.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {friendMock} from '../mocks/friend.model.mock';
import {accpetMock} from '../mocks/accept.model.mock';

describe('FriendsService', () => {
    let service: FriendsService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(FriendsService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create friends service', () => {
        expect(service).toBeTruthy();
    });

    it('add: should call http POST', done => {
        service.add(friendMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'requests');
        expect(req.request.method).toBe('POST');
        done();
    });

    it('getRequestByUserName: should call http GET',  done => {
        service.getRequestByUserName('nfffaeeend')
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'requests/nfffaeeend' );
        expect(req.request.method).toBe('GET');
        done();
    });

    it('acceptRequest: should call http PUT', done => {
        service.acceptRequest(accpetMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'requests');
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('deleteRequest: should call http DELETE', done => {
        service.deleteRequest(accpetMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'requests');
        expect(req.request.method).toBe('DELETE');
        done();
    });

    it('getFriends: should call http GET',  done => {
        service.getFriends()
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api );
        expect(req.request.method).toBe('GET');
        done();
    });

    it('deleteFriend: should call http DELETE', done => {
        service.deleteFriend(33333)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '33333');
        expect(req.request.method).toBe('DELETE');
        done();
    });

});
