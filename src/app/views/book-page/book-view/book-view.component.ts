import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../models/book.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {GoogleBooksService} from "../../../services/google-books.service";

@Component({
    selector: 'app-book-view',
    templateUrl: './book-view.component.html',
    styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit, OnDestroy {

    inscricao: Subscription;
    book: Book = new Book();
    stars: number[] = [1, 2, 3, 4, 5];
    hoverState = 0;

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private gBookService: GoogleBooksService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.inscricao = this.route.params.subscribe(params => {
            const id = params['id'];
            this.gBookService.getById(id).subscribe(value => {
                this.book = this.bookService.convertBookToModel(value);
                this.book.image = this.book.image.slice(0, this.book.image.length - 1);
                this.book.image = this.book.image + '2';

            });
        });
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

}
