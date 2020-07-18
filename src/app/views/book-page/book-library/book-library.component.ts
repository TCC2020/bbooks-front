import {Component, OnInit} from '@angular/core';
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-book-library',
    templateUrl: './book-library.component.html',
    styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
    books: any[] = [];
    genres: string[] = [];
    search;

    constructor(
        private gBooksService: GoogleBooksService,
        private bookService: BookService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.router.url.includes('my')) {
            this.genres = this.bookService.getBookCase().map(value => value.description);
        } else {
            this.genres = ['ficção', 'classicos', 'romance', 'literatura'];
        }
    }

    filterBooks() {
        if (this.search === undefined || this.search.trim() === null) {
            return this.books;
        }
        return this.books.filter((book) => {
            if (book.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) {
                return true;
            } else {
                return false;
            }
        });
    }

}
