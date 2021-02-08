import {TestBed} from '@angular/core/testing';

import {GroupMemberService} from './group-member.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GroupMemberService', () => {
    let service: GroupMemberService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(GroupMemberService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
