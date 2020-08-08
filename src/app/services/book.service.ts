import {Injectable} from '@angular/core';
import {BookCase} from "../models/bookCase.model";
import {Book} from "../models/book.model";
import {GoogleBooksService} from "./google-books.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/author.model";
import {UserbookService} from "./userbook.service";
import {of} from "rxjs";
import {AuthService} from "./auth.service";
import {TagService} from "./tag.service";
import {UserBookTO} from "../models/userBookTO";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    genres: string[] = ['ficção', 'classicos', 'romance', 'literatura'];

    books: any[];

    api = environment.api + 'books';

    constructor(
        private gBooksService: GoogleBooksService,
        private http: HttpClient,
        private userbookService: UserbookService,
        private authGuard: AuthService,
        private tagService: TagService
    ) {
    }

    getAllTags() {
        return this.tagService.getAllByProfile(this.authGuard.getUser().profile.id);
    }

    getAllBooksTags() {
        const result = [];
        this.getAllTags().subscribe(tags => {
            tags.forEach(tag => {
                const bc = new BookCase();
                bc.id = tag.id;
                bc.description = tag.name;
                bc.books = [];
                if (tag.books) {
                    this.getBooksByUserBooks(tag.books).subscribe(books => {
                        bc.books = books;
                    });
                    result.push(bc);
                }
            });
        });
        return of(result);
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
    getBookCaseByTag(tagId: number): Observable<BookCase> {
        const result = new BookCase();
        result.books = [];
        this.tagService.getById(tagId).subscribe(tag => {
            result.description = tag.name
            result.id = tag.id;
            this.getBooksByUserBooks(tag.books).subscribe(books => {
                result.books = books;
            });
        },
         error => {
            console.log('BookService - error, getBookCaseByTag', error);
         });
        return of(result);
    }
    getBooksByUserBooks(userBook: UserBookTO[]): Observable<Book[]> {
        const result = [];
        if (userBook) {
            userBook.forEach(realation => {
                this.tagService.getAllByUserBook(realation.id).subscribe(tags => {
                    this.gBooksService.getById(realation.idBook).subscribe(book => {
                        const b = this.convertBookToModel(book);
                        b.tags = tags;
                        b.idUserBook = realation.id;
                        b.status = realation.status;
                        b.tags = tags;
                        result.push(b);
                    });

                });
            });
        }

        return of(result);
    }

    convertBookToModel(book: any): Book {
        const b = new Book();
        b.authors = [];
        b.id = book.id;
        if (book.volumeInfo) {
            if (book.volumeInfo.industryIdentifiers) {
                b.isbn10 = book.volumeInfo.industryIdentifiers[0]?.identifier;
                b.isbn13 = book.volumeInfo.industryIdentifiers[1]?.identifier;
            }
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
        }
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

    getAllBookGoogle() {
        const result = [];
        this.genres.forEach(genre => {
            const bc = new BookCase();
            bc.books = [];
            bc.description = genre;
            bc.id = genre;
            this.gBooksService.searchByName(genre).subscribe(books => {
                this.books = books['items'];
                bc.books = this.books.map(value => this.convertBookToModel(value));
                result.push(bc);
            });
        });
        return of(result);
    }
}
