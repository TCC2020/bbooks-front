import {Role} from './enums/Role.enum';
import {MemberStatus} from './enums/MemberStatus.enum';
import {UserTO} from './userTO.model';

export class GroupMembers {
    userId: string;
    groupId: string;
    date: Date;
    role: Role;
    status: MemberStatus;
    user: UserTO;
}

export class Id {
    user: string;
    groupRead: string;
}
