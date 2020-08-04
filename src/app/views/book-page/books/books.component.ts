import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookCase} from "../../../models/bookCase.model";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";
import {TagService} from "../../../services/tag.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

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
        private route: ActivatedRoute

    ) {
    }

    ngOnInit(): void {
        this.inscricao = this.route.data.subscribe((data: {bookcases: BookCase[]}) => {
            this.bookCases = data.bookcases;
        });
    }
    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

}
