import {Role} from './enums/Role.enum';
import {MemberStatus} from './enums/MemberStatus.enum';
import {UserTO} from './userTO.model';

export class GroupMembers {
    id: Id;
    date: Date;
    role: Role;
    status: MemberStatus;
    userTO: UserTO;
}

export class Id {
    user: string;
    groupRead: string;
}
