import {GroupMembers, Id} from '../models/GroupMembers.model';
import {userMock} from './user.model.mock';
import {Role} from '../models/enums/Role.enum';
import {MemberStatus} from '../models/enums/MemberStatus.enum';

export const groupMembersMock = new GroupMembers();
groupMembersMock.groupId = 'sfjaowesifjsoiaefj';
groupMembersMock.userId = userMock.id.toString();
groupMembersMock.role = Role.owner;
groupMembersMock.status = MemberStatus.aceppted;
groupMembersMock.user = userMock;

export const groupMembersListMock = [];
groupMembersListMock.push(groupMembersMock);
groupMembersListMock.push(groupMembersMock);
groupMembersListMock.push(groupMembersMock);
groupMembersListMock.push(groupMembersMock);
