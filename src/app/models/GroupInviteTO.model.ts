import {Observable} from 'rxjs';
import {UserTO} from './userTO.model';
import {GroupTO} from './GroupTO.model';

export class GroupInviteTO {
    id: string;
    groupId: string;
    group: GroupTO;
    userId: string;
    inviter: string;
    inviterUser: Observable<UserTO>;
    groupInvite: Observable<GroupTO>;
}
