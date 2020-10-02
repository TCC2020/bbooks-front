import {UserTO} from '../models/userTO.model';
import {Profile} from '../models/profileTO.model';
import {profileMock} from './profile.model.mock';

export const userMock = new UserTO();
userMock.profile = new Profile();
userMock.profile = profileMock;
userMock.id = 10;
userMock.userName = 'teste.t';
userMock.token = 'lkkhviasdhoivsdjviosadjfoiajfspewajsfdposd';
userMock.email = 'teste@teste.com';
userMock.password = 'safdoiewahfojsafe';
userMock.idSocial = '1111111111111';
userMock.verified = false;
userMock.password = 'asdfjoiewajfoiafoijwefoiewafw';