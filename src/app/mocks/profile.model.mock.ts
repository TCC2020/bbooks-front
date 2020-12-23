import {Profile} from '../models/profileTO.model';

export const profileMock = new Profile();
profileMock.profileImage = 'image';
profileMock.country = 'brazil';
profileMock.birthDate = '10/01/2020';
profileMock.state = 'Sao Paulo';
profileMock.id = 10;
profileMock.city = 'Sao Paulo';
profileMock.lastName = 'nascimento';
profileMock.name = 'pedro';

export const profileMock1 = new Profile();
profileMock1.profileImage = 'image';
profileMock1.country = 'brazil';
profileMock1.birthDate = '10/01/2020';
profileMock1.state = 'Sao Paulo';
profileMock1.id = 10;
profileMock1.city = 'Sao Paulo';
profileMock1.lastName = 'nascimento';
profileMock1.name = 'Rafael';
