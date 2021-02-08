import {GroupMembers, Id} from '../models/GroupMembers.model';
import {userMock} from './user.model.mock';
import {Role} from '../models/enums/Role.enum';
import {MemberStatus} from '../models/enums/MemberStatus.enum';

export const groupMembersMock = new GroupMembers();
groupMembersMock.id = new Id();
groupMembersMock.id.group = 'sfjaowesifjsoiaefj';
groupMembersMock.id.user = userMock.id.toString();
groupMembersMock.cargo = Role.owner;
groupMembersMock.status = MemberStatus.aceppted;
