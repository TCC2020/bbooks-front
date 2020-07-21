import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../../../services/book.service";
import {BookCase} from "../../../models/bookCase.model";
import {Book} from "../../../models/book.model";
import {BookAddDialogComponent} from "../book-add-dialog/book-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {BookStatus} from "../../../models/enums/BookStatus.enum";

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit, OnDestroy {
    books;
    bookCase: BookCase = new BookCase();
    search;
    bookStatusFilter: string[] = ['lidos', 'lendo', 'a ler'];
    inscricao: Subscription;
    deviceXs;
    mediaSub: Subscription;
    userBook: boolean;
    bookStatus = BookStatus;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService,
        public dialog: MatDialog,
        public mediaObserver: MediaObserver,
        private router: Router,
        private gBooksService: GoogleBooksService,
    ) {
    }

    ngOnInit(): void {
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
        this.userBook = this.router.url.includes('my');

        this.inscricao = this.route.params.subscribe(params => {
            let bookcase = params['bookcase'];
            if (this.userBook) {
                this.bookCase = this.bookService.getBookCaseByDescription(bookcase);
                if (this.bookCase) {
                    this.books = this.bookCase.books;
                }
            } else {
                this.gBooksService.searchByName(bookcase).subscribe(books => {
                    this.books = this.bookService.convertBookToBookList(books['items']);
                });
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
        this.mediaSub.unsubscribe();
    }

    openDialogAddBook(book: Book, bookcase: string) {
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
            height: '450px',
            width: '400px',
            data: {
                book,
                bookcase
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.books = this.bookCase.books;
        });
    }
    verifyrouter(): boolean {
        return this.router.url.includes('my');
    }


}
