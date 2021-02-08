import {TestBed} from '@angular/core/testing';

import {FeedService} from './feed.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {userMock} from '../mocks/user.model.mock';

describe('FeedService', () => {
    let service: FeedService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(FeedService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('getFeed: should call http GET on feed service', done => {
        service.getFeed( 5, 0)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + '?page=0&size=5');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getPersonFeed: should call http GET on feed service', done => {
        service.getPersonFeed(userMock.profile.id, 5, 0)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + userMock.profile.id + '?page=0&size=5');
        expect(req.request.method).toBe('GET');
        done();
    });
});
