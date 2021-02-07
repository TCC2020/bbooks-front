import {TestBed} from '@angular/core/testing';

import {GroupMemberService} from './group-member.service';

describe('GroupMemberService', () => {
    let service: GroupMemberService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GroupMemberService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
