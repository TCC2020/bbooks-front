import {GroupMembers, Id} from '../models/GroupMembers.model';
import {userMock} from './user.model.mock';
import {Role} from '../models/enums/Role.enum';
import {MemberStatus} from '../models/enums/MemberStatus.enum';

export const groupMembersMock = new GroupMembers();
groupMembersMock.id = new Id();
groupMembersMock.id.groupRead = 'sfjaowesifjsoiaefj';
groupMembersMock.id.user = userMock.id.toString();
groupMembersMock.role = Role.owner;
groupMembersMock.status = MemberStatus.aceppted;
