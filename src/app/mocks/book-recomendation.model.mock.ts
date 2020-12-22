import {BookRecommendationTO} from '../models/bookRecommendationTO.model';
import {bookMock} from './book.model.mock';
import {of} from 'rxjs';
import {profileMock} from './profile.model.mock';

export const bookRecomendationMock = new BookRecommendationTO();
bookRecomendationMock.book = of(bookMock);
bookRecomendationMock.comentario = 'otimo';
bookRecomendationMock.id = '11111101010';
bookRecomendationMock.idBook = 33333;
bookRecomendationMock.idBookGoogle = ' sfkjlaefjsafesf';
bookRecomendationMock.profileReceived = 33332;
bookRecomendationMock.profileTO = of(profileMock);
