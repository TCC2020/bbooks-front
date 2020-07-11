import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../../../services/book.service";
import {BookCase} from "../../../models/bookCase.model";

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit, OnDestroy {
    books;
    bookCase: BookCase = new BookCase();
    search;
    busca: string = 'o menino';
    bookStatusFilter: string[] = ['lidos', 'lendo', 'a ler'];
    inscricao: Subscription;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {

        this.inscricao = this.route.params.subscribe(params => {
            let bookcase = params['bookcase'];
            if (bookcase === 'all') {


            } else {
                this.bookCase = this.bookService.getBookCaseByDescription(bookcase);
                if (this.bookCase) {
                    this.books = this.bookCase.books;
                }
            }
        });
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

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }


}
