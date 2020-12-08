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
