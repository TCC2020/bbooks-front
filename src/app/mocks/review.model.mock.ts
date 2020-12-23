import {ReviewTO} from '../models/ReviewTO.model';
import {profileMock} from './profile.model.mock';
import {of} from 'rxjs';
import {ReviewsPagination} from '../models/pagination/reviews.pagination';
import {pageableMock} from './pageable.model.mock';

export const reviewMock = new ReviewTO();
reviewMock.id = 'sdfjaoiesoijfdsf';
reviewMock.profileTO = of(profileMock);
reviewMock.title = ' asfeoifojdsafasef';
reviewMock.profileId = 10;
reviewMock.body = 'fsaesfsef';
reviewMock.idGoogleBook = 'fesafjlasoief';

export const reviewsMock = [] as ReviewTO[];
reviewsMock.push(reviewMock);
reviewsMock.push(reviewMock);
reviewsMock.push(reviewMock);
reviewsMock.push(reviewMock);

export const reviewPagination = new ReviewsPagination();
reviewPagination.content = reviewsMock;
reviewPagination.size = 10;
reviewPagination.totalPages = 10;
reviewPagination.pageable = pageableMock;





