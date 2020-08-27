import {Component, OnInit} from '@angular/core';
import {AuthGuard} from 'src/app/guards/auth-guard';
import {UserService} from 'src/app/services/user.service';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from 'src/app/services/google-books.service';
import {AuthService} from "../../services/auth.service";
import {Book} from "../../models/book.model";
import {BooksResolve} from "../book-page/guards/books.resolve";
import {BookService} from "../../services/book.service";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    public user;
    searchControl;
    books: Book[];

    constructor(
        public auth: AuthService,
        private userService: UserService,
        private fb: FormBuilder,
        private gBooksService: GoogleBooksService,
        private bookService: BookService
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
    }

    searchBook() {
        this.searchControl.value.book?.split(' ').join('+');
        this.gBooksService.searchByName(this.searchControl.value.book.split(' ').join('+')).subscribe(books => {
            let booksConvert = [];
            booksConvert = books['items'];
            this.books = booksConvert.map(value => this.bookService.convertBookToModel(value));
        });
    }
}
