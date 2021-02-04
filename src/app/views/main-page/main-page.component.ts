import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthGuard} from 'src/app/guards/auth-guard';
import {UserService} from 'src/app/services/user.service';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from 'src/app/services/google-books.service';
import {AuthService} from '../../services/auth.service';
import {Book} from '../../models/book.model';
import {BooksResolve} from '../book-page/guards/books.resolve';
import {BookService} from '../../services/book.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BookSearchTO} from '../../models/bookSearchTO.model';
import {map, take} from 'rxjs/operators';
import * as util from "util";
import {Util} from "../shared/Utils/util";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public user;
    searchControl;
    books: Book[];
    mediaSub: Subscription;
    deviceXs: boolean;
    totalBooks = 0;
    pageEvent: PageEvent = new PageEvent();
    pageSize = 10;

    constructor(
        public auth: AuthService,
        private userService: UserService,
        private fb: FormBuilder,
        private gBooksService: GoogleBooksService,
        private bookService: BookService,
        public mediaObserver: MediaObserver,

    ) {
        this.searchControl = this.fb.group({
            book: ['']
        });
        this.pageEvent.pageSize = 10;
        this.pageEvent.pageIndex = 0;

    }

    ngOnInit(): void {
        if (this.auth.getToken() != null) {
            this.userService.updateUserInfo();
            this.user = this.auth.getUser();
        }
        this.mediaSub = this.mediaObserver.asObservable().subscribe((result: MediaChange[]) => {
            this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
        });
    }

    searchBook(): void {
        const searchBook = new BookSearchTO();
        searchBook.search = this.searchControl.value.book.split(' ').join('+');
        searchBook.page = this.pageEvent.pageIndex;
        this.bookService.searchMergeBooks(searchBook,  this.pageEvent.pageSize)
            .pipe(
                map(sb => {
                    sb.googleBooks.items ?
                    sb.googleBooks.items = sb.googleBooks.items.map( i => this.bookService.convertBookToModel(i)) :
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
    changePage(event: PageEvent) {
        this.pageEvent = event;
        this.searchBook();
    }

    resulSearch(booksConvert): void {
       const result =  booksConvert.map(book => {
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
