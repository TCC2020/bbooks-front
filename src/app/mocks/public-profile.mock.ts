import {UserPublicProfileTO} from '../models/UserPublicProfileTO.model';
import {userMock1} from './user.model.mock';
import {profilesMock} from './profile.model.mock';

export const publicProfileMock = new UserPublicProfileTO();
publicProfileMock.id = '337a3e65-5fee-458c-a18e-79458c5355a5';
publicProfileMock.name = 'Rafael Peinado';
publicProfileMock.description = 'Página oficial do Rafael Peinado';
publicProfileMock.followers = profilesMock;
publicProfileMock.user = userMock1;


export const publicProfilesMock = [];
publicProfilesMock.push(publicProfileMock);
publicProfilesMock.push(publicProfileMock);
publicProfilesMock.push(publicProfileMock);
publicProfilesMock.push(publicProfileMock);
