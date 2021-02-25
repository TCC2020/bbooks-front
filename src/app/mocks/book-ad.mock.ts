import {BookAdTO} from '../models/BookAdTO.model';
import {BookCondition} from '../models/enums/BookCondition.enum';

export const bookAdMock = new BookAdTO();
bookAdMock.id = 'dfasefasef';
bookAdMock.address = 'sp;itaqua;sp';
bookAdMock.title = 'quero um livro';
bookAdMock.condition = BookCondition.not_used;
bookAdMock.images = ['first', 'second'];


export const bookAdsMock = [];
bookAdsMock.push(bookAdMock);
bookAdsMock.push(bookAdMock);
bookAdsMock.push(bookAdMock);
bookAdsMock.push(bookAdMock);
bookAdsMock.push(bookAdMock);
