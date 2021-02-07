import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GroupMembers} from '../models/GroupMembers.model';

@Injectable({
    providedIn: 'root'
})
export class GroupMemberService {

    api = environment.feedApi + 'group/member/';

    constructor(
        private http: HttpClient
    ) {
    }

    enterGroup(groupMenbers: GroupMembers): Observable<void> {
        return this.http.post<void>(this.api, groupMenbers);
    }

    getGroupMembers(idGroup: string): Observable<GroupMembers[]> {
        return this.http.get<GroupMembers[]>(this.api + idGroup);
    }
}
