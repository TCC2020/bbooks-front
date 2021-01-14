import {UserBookTO} from '../models/userBookTO';
import {bookMock} from './book.model.mock';
import {BookStatus} from '../models/enums/BookStatus.enum';
import {tagsMock} from './tag.model.mock';

export const userbookMock = new UserBookTO();
userbookMock.idBook = 11111111;
userbookMock.book = bookMock;
userbookMock.page = 60;
userbookMock.status = BookStatus.LIDO;
userbookMock.profileId = 33333333;
userbookMock.tags = tagsMock;
userbookMock.id = 323232323;
export const userbooksMock = [];

userbooksMock.push(userbooksMock);
userbooksMock.push(userbooksMock);
userbooksMock.push(userbooksMock);
