import {Component, OnDestroy, OnInit} from '@angular/core';
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
    }

    ngOnInit(): void {
        if (this.auth.getToken() != null) {
            this.userService.updateUserInfo();
            this.user = this.auth.getUser();
        }
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
    }

    searchBook() {
        this.searchControl.value.book?.split(' ').join('+');
        this.gBooksService.searchByName(this.searchControl.value.book.split(' ').join('+')).subscribe(books => {
            let booksConvert = [];
            booksConvert = books['items'];
            this.resulSearch(booksConvert);
        });
    }
    resulSearch(booksConvert): void {
       const result =  booksConvert.map(value => {
            const book = this.bookService.convertBookToModel(value);
            if (this.user) {
                this.bookService.getAllUserBooks().subscribe((userbooks) => {
                    userbooks.books.forEach(userbook => {
                        if (book.id.includes(userbook.idBook)) {
                            book.status = userbook.status;
                            book.idUserBook = userbook.id;
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
}
