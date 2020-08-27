import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookCase} from "../../../models/bookCase.model";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
    bookCases: BookCase[];
    inscricao: Subscription;

    constructor(
        private gBookService: GoogleBooksService,
        private route: ActivatedRoute,
        private bookService: BookService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.inscricao = this.route.data.subscribe((data: { bookcases: BookCase[] }) => {
            this.bookCases = data.bookcases;
        });

        this.bookService.updateListCarrousel.subscribe(updated => {
            if (updated) {
                const myBook = this.router.url.toString().includes('mybooks');
                if (myBook) {
                    this.bookService.getAllBooksTags().subscribe(
                        bcs => {
                            this.bookCases = bcs;
                        }, error => console.log('error booksComponent', error));
                }
            }
        });
    }
    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

    updateBooksStatus(event) {
        this.bookCases.forEach(bookcases => {
            bookcases.books.forEach(book => {
                if (book.id === event.idbook) {
                    book.status = event.status;
                }
            });
        });
    }

}
