import {GroupTO} from '../models/GroupTO.model';
import {PostPrivacy} from '../models/enums/PostPrivacy.enum';

export const groupMock = new GroupTO();
groupMock.id = '10';
groupMock.name = 'first group';
groupMock.privacy = PostPrivacy.public_all;
groupMock.userId = '1010101011f';
groupMock.description = 'cool group';

export const groupsMock = [];
groupsMock.push(groupMock);
groupsMock.push(groupMock);
groupsMock.push(groupMock);
groupsMock.push(groupMock);
