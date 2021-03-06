import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../../models/book.model';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookService} from '../../../services/book.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {BookSearchTO} from '../../../models/bookSearchTO.model';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-books-search',
    templateUrl: './books-search.component.html',
    styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent implements OnInit, OnDestroy {
    public user;
    books: Book[];
    mediaSub: Subscription;
    deviceXs: boolean;
    totalBooks = 0;
    pageEvent: PageEvent = new PageEvent();
    pageSize = 10;
    search;
    loading = false;

    constructor(
        public auth: AuthService,
        private userService: UserService,
        private fb: FormBuilder,
        private gBooksService: GoogleBooksService,
        private bookService: BookService,
        public mediaObserver: MediaObserver,
        private route: ActivatedRoute
    ) {
        this.pageEvent.pageSize = 10;
        this.pageEvent.pageIndex = 0;
    }

    ngOnInit(): void {
        this.user = this.auth.getUser();

        this.mediaSub = this.mediaObserver.asObservable().subscribe((result: MediaChange[]) => {
            this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
        });
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(params => {
                this.search = params;
                this.searchBook();
            });
    }

    searchBook(): void {
        if (this.search) {
            this.loading = true;
            const searchBook = new BookSearchTO();
            searchBook.search = this.search.split(' ').join('+');
            searchBook.page = this.pageEvent.pageIndex;
            this.bookService.searchMergeBooks(searchBook, this.pageEvent.pageSize)
                .pipe(
                    map(sb => {
                        sb.googleBooks.items ?
                            sb.googleBooks.items = sb.googleBooks.items.map(i => this.bookService.convertBookToModel(i)) :
                            sb.googleBooks.items = [];
                        return sb;
                    }),
                    take(1)
                )
                .subscribe(res => {
                        this.totalBooks = res.googleBooks.totalItems + res.books.totalElements;
                        let booksConvert = [];
                        booksConvert = res.books.content.concat(res.googleBooks.items);
                        booksConvert?.length > 0 ?
                            this.resulSearch(booksConvert) :
                            this.resetBooks();
                    },
                    error => console.log(error));
        }
    }

    changePage(event: PageEvent) {
        this.pageEvent = event;
        this.searchBook();
    }

    resulSearch(booksConvert): void {
        const result = booksConvert.map(book => {
            if (this.user) {
                this.bookService.getAllUserBooks().subscribe((userbooks) => {
                    userbooks.books.forEach(userbook => {
                        if (book?.id === userbook.idBookGoogle ||
                            book?.id === userbook?.idBook) {
                            book.status = userbook.status;
                            book.idUserBook = userbook.id;
                            book.finishDate = userbook.finishDate;
                        }
                    });
                });
            }
            return book;
        });
        this.longPromise(500).then(() => {
            this.books = result;
            this.loading = false;
        });
    }

    longPromise(delay: number) {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve('Done');
            }, delay);
        });
    }

    ngOnDestroy(): void {
        this.mediaSub.unsubscribe();
    }

    resetBooks(): void {
        this.books = [];
        this.totalBooks = 0;
    }

}
