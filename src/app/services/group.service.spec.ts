import {TestBed} from '@angular/core/testing';

import {GroupService} from './group.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {postMock} from '../mocks/post.model.mock';
import {groupMock} from '../mocks/group.mock';

describe('GroupService', () => {
    let service: GroupService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule
          ]
        });
        service = TestBed.inject(GroupService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('save: should call http POST in group Service', done => {
        service.save(groupMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('update: should call http PUT in group Service', done => {
        service.update(groupMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + groupMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('update: should call http PUT in group Service', done => {
        service.update(groupMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + groupMock.id);
        expect(req.request.method).toBe('PUT');
        done();
    });

    it('getById: should call http GET in group Service', done => {
        service.getById(groupMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + groupMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });
    it('delete: should call http DELETE in group Service', done => {
        service.delete(groupMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + groupMock.id);
        expect(req.request.method).toBe('DELETE');
        done();
    });
});
