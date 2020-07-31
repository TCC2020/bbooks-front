import {Component, OnInit} from '@angular/core';
import {BookCase} from "../../../models/bookCase.model";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    bookCases: BookCase[] = [];
    genres: string[] = ['ficção', 'classicos', 'romance', 'literatura'];
    books: any[];
    constructor(
        private gBookService: GoogleBooksService,
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {
        this.genres.forEach(genre => {
            const bc = new BookCase();
            bc.books = [];
            bc.description = genre;
            this.gBookService.searchByName(genre).subscribe(books => {
                this.books = books['items'];
                bc.books = this.books.map(value => this.bookService.convertBookToModel(value));
                this.bookCases.push(bc);
            });

        });
    }

}
