import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {GoogleBooksService} from "../../../services/google-books.service";

@Component({
    selector: 'app-book-library',
    templateUrl: './book-library.component.html',
    styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: true
    }
    books: any[] = [];
    genres: string[] = ['ficção', 'classicos', 'romance', 'literatura'];
    search;
    constructor(
        private gBooksService: GoogleBooksService
    ) {
    }

    ngOnInit(): void {
        // this.searchBook();
    }
    filterBooks() {
        if (this.search === undefined || this.search.trim() === null) {
            return this.books;
        }
        return this.books.filter((book) => {
            if (book.volumeInfo.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) {
                return true;
            } else {
                return false;
            }
        });
    }

}
