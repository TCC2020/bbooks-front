import {Injectable} from '@angular/core';
import {BookCase} from "../models/bookCase.model";
import {Book} from "../models/book.model";
import {GoogleBooksService} from "./google-books.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/author.model";
import {BookStatus} from "../models/enums/BookStatus.enum";
import {UserbookService} from "./userbook.service";
import {AuthGuard} from "../guards/auth-guard";
import { of } from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    bookcases: BookCase[] = [];

    books: any[];

    api = environment.api + 'books';

    constructor(
        private gBooksService: GoogleBooksService,
        private http: HttpClient,
        private userbookService: UserbookService,
        private authGuard: AuthService
    ) {
    }

    getAllUserBooks() {
        return this.userbookService.getAllByProfile(this.authGuard.getUser().profile.id);
    }

    getAllBooks(): Observable<any> {
        const result = [];
        this.getAllUserBooks().subscribe(userBook => {
            userBook.books.forEach(realation => {
                this.gBooksService.getById(realation.idBook).subscribe(book => {
                    const b = this.convertBookToModel(book);
                    b.idUserBook = realation.id;
                    b.status = realation.status;
                    result.push(b);
                });
            });

        });
        return of(result);
    }

    getBookCaseDescritption() {
        return this.bookcases.map(value => value.description.toLowerCase());
    }

    getBookCaseByDescription(description: string): BookCase {
        return this.bookcases.find(value => value.description.toLowerCase() === description.toLowerCase());
    }

    addBookCases(bookcase: BookCase) {
        this.bookcases.push(bookcase);
    }

    addBookToBookCase(book: Book, description: string) {
        this.getBookCaseByDescription(description.toLowerCase()).books.push(book);
    }

    removeBookOfBookCase(book: Book, description: string) {
        const books = this.getBookCaseByDescription(description.toLowerCase()).books.filter(value => value.id !== book.id);
        this.getBookCaseByDescription(description.toLowerCase()).books = books;
    }

    convertBookToModel(book: any): Book {
        const b = new Book();
        b.id = book.id;
        b.isbn10 = null;
        b.title = book.volumeInfo.title;
        b.publisher = book.volumeInfo.publisher;
        // b.country = book.saleInfo.country;
        b.language = book.volumeInfo.language;
        b.numberPage = book.volumeInfo.pageCount;
        b.publishedDate = book.volumeInfo.publishedDate;
        b.averageRating = book.volumeInfo.averageRating;
        b.image = book.volumeInfo.imageLinks.thumbnail;
        b.image = b.image.slice(0, b.image.indexOf('zoom=1') + 'zoom=1'.length);
        b.description = book.volumeInfo.description;
        b.authors = this.convertAuthorToModel(book.volumeInfo.authors);
        return b;
    }

    convertBookToBookList(books: any[]): Book[] {
        return books.map(value => this.convertBookToModel(value));
    }

    save(book: Book): Observable<any> {
        return this.http.post(this.api, book);
    }

    convertAuthorToModel(authors: any[]): Author[] {
        const result = new Array<Author>();
        if (authors) {
            authors.map((name) => {
                const a = new Author();
                a.name = name;
                result.push(a);
            });
        }

        return result;
    }

    getBookById(id: string): any {

    }
}
