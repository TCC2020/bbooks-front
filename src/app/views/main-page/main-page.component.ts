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
    typeSearch: any;


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

    searchBook(typeSearch) {
        this.typeSearch = typeSearch;
        if (this.typeSearch === 'google') {
            this.searchControl.value.book?.split(' ').join('+');
            this.gBooksService.searchByNamePagination(
                this.searchControl.value.book.split(' ').join('+'),
                this.pageEvent.pageSize,
                this.pageEvent.pageIndex * this.pageEvent.pageSize
            ).subscribe(books => {
                this.totalBooks = books.totalItems;
                let booksConvert = [];
                booksConvert = books.items;
                booksConvert?.length > 0 ?
                    this.resulSearch(booksConvert) :
                    this.resetBooks();
            });
        } else {
            this.bookService.search(
                this.searchControl.value.book.split(' ').join('+'),
                this.pageEvent.pageSize,
                this.pageEvent.pageIndex
            ).subscribe(booksPagination => {
                this.totalBooks = booksPagination.totalElements;
                const books = booksPagination.content.map(b => {
                    b.api = 'bbooks';
                    return b;
                });
                books?.length > 0 ?
                    this.resulSearch(books) :
                    this.resetBooks();
            });
        }
    }
    changePage(event: PageEvent) {
        this.pageEvent = event;
        this.searchBook(this.typeSearch);
    }

    resulSearch(booksConvert): void {
       const result =  booksConvert.map(value => {
            const book = this.typeSearch === 'google' ? this.bookService.convertBookToModel(value) : value;
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
