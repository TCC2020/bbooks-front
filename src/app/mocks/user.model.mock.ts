import {UserTO} from '../models/userTO.model';
import {Profile} from '../models/profileTO.model';
import { profileMock, profileMock1 } from './profile.model.mock';

export const userMock = new UserTO();
userMock.profile = new Profile();
userMock.profile = profileMock;
userMock.id = '10';
userMock.userName = 'teste.t';
userMock.token = 'lkkhviasdhoivsdjviosadjfoiajfspewajsfdposd';
userMock.email = 'teste@teste.com';
userMock.password = 'safdoiewahfojsafe';
userMock.idSocial = '1111111111111';
userMock.verified = false;
userMock.password = 'asdfjoiewajfoiafoijwefoiewafw';

export const userMock1 = new UserTO();
userMock1.profile = new Profile();
userMock1.profile = profileMock1;
userMock1.id = '11';
userMock1.userName = 'teste.t';
userMock1.token = 'lkkhviasdhoivsdjviosadjfoiajfspewajsfdposd';
userMock1.email = 'teste@teste.com';
userMock1.password = 'safdoiewahfojsafe';
userMock1.idSocial = '1111111111111';
userMock1.verified = false;
userMock1.password = 'asdfjoiewajfoiafoijwefoiewafw';

export const usersMock = [];
usersMock.push(userMock);
usersMock.push(userMock);
usersMock.push(userMock);
usersMock.push(userMock);
usersMock.push(userMock1);
