import {EventEmitter, Injectable, Output} from '@angular/core';
import {BookCase} from '../models/bookCase.model';
import {Book} from '../models/book.model';
import {GoogleBooksService} from './google-books.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError, zip} from 'rxjs';
import {Author} from '../models/author.model';
import {UserbookService} from './userbook.service';
import {of} from 'rxjs';
import {AuthService} from './auth.service';
import {TagService} from './tag.service';
import {UserBookTO} from '../models/userBookTO';
import {BookPagination} from '../models/pagination/book.pagination';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Tag} from '../models/tag';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    genres: string[] = ['ficção', 'classicos', 'romance', 'literatura'];

    @Output() updateListCarrousel = new EventEmitter<any>();

    api = environment.api + 'books/';

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
                    zip(
                        ...this.getBooksByUserBooks(tag.books)
                    ).subscribe((books: Book[]) => {
                        bc.books = books;
                        result.push(bc);
                    });
                }
            });
        });
        return of(result);
    }

    getAllUserBooks(): Observable<any> {
        return this.userbookService.getAllByProfile(this.authGuard.getUser().profile.id);
    }

    getAllBooks(): Observable<any> {
       return this.getAllUserBooks()
            .pipe(
                mergeMap(userBook => {
                    return zip(
                        ...this.getBooksByUserBooks(userBook.books)
                    );
                })
            );
    }

    getBookCaseByTag(tagId: number): Observable<BookCase> {

        // @ts-ignore
        return this.tagService.getById(tagId)
            .pipe(
                mergeMap(tag => {
                    const result = new BookCase();
                    result.books = [];
                    result.description = tag.name;
                    result.id = tag.id;
                    if (tag?.books?.length > 0) {
                        return zip(
                            ...this.getBooksByUserBooks(tag.books)
                        ).pipe(
                            map((books: Book[]) => {
                                result.books = books;
                                return result;
                            })
                        );
                    }
                    return of(result);
                }),
                catchError((err => {
                        console.log('BookService - error, getBookCaseByTag', err);
                        return throwError(err);
                    })
                ));
    }

    getBooksByUserBooks(userBook: UserBookTO[]): any[] {
            return userBook.map(realation => {
                if (realation.idBookGoogle) {
                    return this.gBooksService.getById(realation.idBookGoogle).pipe(
                        map(book => {
                            const b = this.convertBookToModel(book);
                            b.idUserBook = realation.id;
                            b.status = realation.status;
                            return b;
                        })
                    );
                } else {
                    const id = realation.idBook ? realation.idBook : realation.book.id;
                    return this.getById(id as number).pipe(
                        map(b => {
                            b.idUserBook = realation.id;
                            b.status = realation.status;
                            return b;
                        })
                    );
                }
            });
    }

    convertBookToModel(book: any): Book {
        const b = new Book();
        b.authors = [];
        b.id = book.id;
        b.api = 'google';
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
            if (book.volumeInfo.imageLinks) {
                b.image = book.volumeInfo.imageLinks.thumbnail;
                b.image = b.image.slice(0, b.image.indexOf('zoom=1') + 'zoom=1'.length);
                b.image = b.image + '&source=gbs_api';
                b.image = 'https' + b.image.substr(4, b.image.length);
            }
            b.description = book.volumeInfo.description;
            b.authors = this.convertAuthorToModel(book.volumeInfo.authors);
        }
        return b;
    }

    convertBookToBookList(books: any[]): Book[] {
        return books.map(value => this.convertBookToModel(value));
    }

    save(book: Book): Observable<Book> {
        return this.http.post<Book>(this.api, book);
    }
    update(book: Book): Observable<Book> {
        return this.http.put<Book>(this.api + book.id, book);
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
            this.gBooksService.searchByName(genre).subscribe(response => {
                let books = [];
                // @ts-ignore
                books = response.items;

                bc.books = books.map(value => {
                    const b = this.convertBookToModel(value);
                    this.getAllUserBooks().subscribe((userbooks) => {
                        userbooks.books.forEach(userbook => {
                            if (userbook.idBookGoogle === b.id) {
                                b.status = userbook.status;
                                b.idUserBook = userbook.id;
                            }
                        });
                    });
                    return b;
                });
                result.push(bc);
            });
        });
        return of(result);
    }

    search(search: string, size: number, page: number): Observable<BookPagination> {
        const params = new HttpParams()
            .set('search', search)
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<BookPagination>(this.api + 'search', {params});
    }

    getById(id: number): Observable<Book> {
        return this.http.get<Book>(this.api + id);
    }
}
