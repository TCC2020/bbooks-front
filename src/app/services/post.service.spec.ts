import {TestBed} from '@angular/core/testing';

import {PostService} from './post.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FriendsService} from './friends.service';
import {friendMock} from '../mocks/friend.model.mock';
import {postMock} from '../mocks/post.model.mock';
import {profileMock} from '../mocks/profile.model.mock';
import {userMock} from '../mocks/user.model.mock';

describe('PostService', () => {
    let service: PostService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('add: should call http POST', done => {
        service.save(postMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });
    it('save: should call http POST on postService', done => {
        service.save(postMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('update: should call http PUT on postService', done => {
        service.update(postMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + postMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });
    it('getByProfileId: should call http GET on postService', done => {
        service.getByProfileId(userMock.profile.id, 5, 0)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + 'profile/' + userMock.profile.id + '?page=0&size=5');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('delete: should call http DELETE on postService', done => {
        service.delete(postMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + postMock.id);
        expect(req.request.method).toBe('DELETE');
        done();
    });
});
