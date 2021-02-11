import {TestBed} from '@angular/core/testing';

import {GroupMemberService} from './group-member.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {groupMock} from '../mocks/group.mock';
import {groupMembersMock} from '../mocks/group-members.mock';

describe('GroupMemberService', () => {
    let service: GroupMemberService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(GroupMemberService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('enterGroup: should call http POST in group member Service', done => {
        service.enterGroup(groupMembersMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api);
        expect(req.request.method).toBe('POST');
        done();
    });

    it('getGroupMembers: should call http GET in group member Service', done => {
        service.getGroupMembers(groupMock.id)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + groupMock.id);
        expect(req.request.method).toBe('GET');
        done();
    });

});
