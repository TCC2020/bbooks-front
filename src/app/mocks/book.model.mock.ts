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
bookMock.title = 'Test para filtro do titulo';
bookMock.publisher = 'Editora Cultrix';
bookMock.language = 'pt';
bookMock.numberPage = 159;
bookMock.publishedDate = 2004;
bookMock.averageRating = 5;
bookMock.image = 'http://books.google.com/books/content?id=aakP7e1p8soC&printsec=frontcover&img=1&zoom=1';
bookMock.description = 'Este é um livro que pode interessar a qualquer leitor e, graças à maneira sistemática por que foi organizado...';
bookMock.authors = authors;
bookMock.status = BookStatus.RELENDO;
bookMock.idUserBook = 101011
const books = [];
books.push(bookMock);
let i = 0;
while (i < 15) {
    const book = new Book();
    book.authors = [];
    book.isbn10 = '8531602084';
    book.isbn13 = '9788531602085';
    book.title = 'Introdução À Teoria Da Literatura';
    book.publisher = 'Editora Cultrix';
    book.language = 'pt';
    book.numberPage = 159;
    book.publishedDate = 2004;
    book.averageRating = 5;
    book.image = 'http://books.google.com/books/content?id=aakP7e1p8soC&printsec=frontcover&img=1&zoom=1';
    book.description = 'Este é um livro que pode interessar a qualquer leitor e, graças à maneira sistemática por que foi organizado...';
    book.authors = authors;
    book.status = BookStatus.QUERO_LER;
    book.idUserBook = 2020;
    const random = Math.floor(Math.random() * 100)
    book.id = random.toString();
    if (!books.includes(book)) {
        books.push(book);
    }
    i++;
}

export const booksMock = books;
