import {UserBookTO} from '../models/userBookTO';
import {bookMock} from './book.model.mock';
import {BookStatus} from '../models/enums/BookStatus.enum';
import {tagsMock} from './tag.model.mock';
import {UserBooksDataStatusTO} from '../models/UserBooksDataStatusTO.model';

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

export const userBooksDataStatusMock = new UserBooksDataStatusTO();
userBooksDataStatusMock.interrompido = 2;
userBooksDataStatusMock.queroLer = 3;
userBooksDataStatusMock.lendo = 4;
userBooksDataStatusMock.lido = 6;
userBooksDataStatusMock.emprestado = 5;
userBooksDataStatusMock.relendo = 1;

