import {ReviewTO} from '../models/ReviewTO.model';
import {profileMock} from './profile.model.mock';
import {of} from 'rxjs';

export const reviewMock = new ReviewTO();
reviewMock.id = 'sdfjaoiesoijfdsf';
reviewMock.profileTO = of(profileMock);
reviewMock.title = ' asfeoifojdsafasef';
reviewMock.profileId = 10;
reviewMock.body = 'fsaesfsef';
reviewMock.idGoogleBook = 'fesafjlasoief';

export const reviewsMock = [];
reviewsMock.push(reviewsMock);
reviewsMock.push(reviewsMock);
reviewsMock.push(reviewsMock);
reviewsMock.push(reviewsMock);




