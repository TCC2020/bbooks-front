import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GroupMembers} from '../models/GroupMembers.model';
import {GroupTO} from '../models/GroupTO.model';
import {GroupInviteTO} from '../models/GroupInviteTO.model';

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
    getGroupsByUser(idUser: string): Observable<GroupTO[]> {
        return this.http.get<GroupTO[]>(this.api + 'user/' + idUser);
    }

    getGroupMembers(idGroup: string): Observable<GroupMembers[]> {
        return this.http.get<GroupMembers[]>(this.api + idGroup);
    }
    invite(groupMember: GroupInviteTO): Observable<GroupInviteTO> {
        return this.http.put<GroupInviteTO>(this.api + 'invites', groupMember);
    }
    getInvites(userId: string): Observable<GroupInviteTO[]> {
        return this.http.get<GroupInviteTO[]>(this.api + 'invites/user/' + userId );
    }
    acceptInvite(id: string): Observable<GroupInviteTO> {
        return this.http.put<GroupInviteTO>(this.api + 'invites/' + id  + '/accept', null);
    }

    refuseInvite(id: string): Observable<GroupInviteTO[]> {
        return this.http.delete<GroupInviteTO[]>(this.api + 'invites/' + id  + '/refuse');
    }
    exitGroup(groupMember: GroupMembers): Observable<void> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: groupMember
        };
        return this.http.delete<void>(this.api, options);
    }
}
