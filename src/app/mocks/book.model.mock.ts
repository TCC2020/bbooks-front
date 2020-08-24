import {Book} from "../models/book.model";
import {Author} from "../models/author.model";
import {BookStatus} from "../models/enums/BookStatus.enum";

export const bookMock = new Book();
const authors = [];
const author = new Author();
author.name = 'António Soares Amora';
authors.push(author)
bookMock.authors = [];
bookMock.id = '101010101010110';
bookMock.isbn10 = '8531602084';
bookMock.isbn13 = '9788531602085';
bookMock.title = 'Introdução À Teoria Da Literatura';
bookMock.publisher = 'Editora Cultrix';
bookMock.language = 'pt';
bookMock.numberPage = 159;
bookMock.publishedDate = 2004;
bookMock.averageRating = 5;
bookMock.image = 'http://books.google.com/books/content?id=aakP7e1p8soC&printsec=frontcover&img=1&zoom=1';
bookMock.description = 'Este é um livro que pode interessar a qualquer leitor e, graças à maneira sistemática por que foi organizado...';
bookMock.authors = authors;
bookMock.status = BookStatus.RELENDO

export const booksMock = [bookMock, bookMock, bookMock, bookMock, bookMock, bookMock]
