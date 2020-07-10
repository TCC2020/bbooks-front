import {Injectable} from '@angular/core';
import {BookCase} from "../models/bookCase.model";
import {Book} from "../models/book.model";
import {GoogleBooksService} from "./google-books.service";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    bookcases: BookCase[] = [];
    bookCase1: BookCase = new BookCase();
    bookCase2: BookCase = new BookCase();
    books: any[] = [];

    constructor(
        private gBooksService: GoogleBooksService
    ) {
        this.bookCase1.books = [];
        this.bookCase2.books = [];
        this.bookCase1.description = 'romance';
        this.gBooksService.searchByName(this.bookCase1.description).subscribe(books => {
            this.books = books['items'];
            this.bookCase1.books = this.books.map(value => this.convertBookToModel(value));
            this.bookcases.push(this.bookCase1);
        });

        this.bookCase2.description = 'literatura';
        this.gBooksService.searchByName(this.bookCase2.description).subscribe(books => {
            this.books = books['items'];
            this.bookCase2.books = this.books.map(value => this.convertBookToModel(value));
            this.bookcases.push(this.bookCase2);
        });
    }

    getBookCase() {
        return this.bookcases;
    }

    getBookCaseByDescription(descripiton: string): BookCase {
        return this.bookcases.find(value => value.description === descripiton);
    }

    addBookCases(bookcase: BookCase) {
        this.bookcases.push(bookcase);
    }

    addBookToBookCase(idBook: string) {

    }

    convertBookToModel(book: any): Book {
        const b = new Book();
        b.id = book.id;
        b.isbn = null;
        b.title = book.volumeInfo.title;
        b.publisher = book.volumeInfo.publisher;
        b.country = book.saleInfo.country;
        b.language = book.volumeInfo.language;
        b.pageCount = book.volumeInfo.pageCount;
        b.publishedDate = book.volumeInfo.publishedDate;
        b.averageRating = book.volumeInfo.averageRating;
        b.image = book.volumeInfo.imageLinks.thumbnail;
        b.searchInfo = book?.searchInfo?.textSnippet;
        b.authors = book.volumeInfo.authors;
        return b;
    }
}
