import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GoogleBooksService} from '../../../../services/google-books.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../../../../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {Book} from "../../../../models/book.model";
import {BookAddDialogComponent} from "../../book-add-dialog/book-add-dialog.component";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {BookStatus, mapBookStatus} from "../../../../models/enums/BookStatus.enum";
import {UserbookService} from "../../../../services/userbook.service";

@Component({
    selector: 'app-carrousel',
    templateUrl: './carrousel.component.html',
    styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit, OnDestroy {

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
                items: 2
            },
            400: {
                items: 3
            },
            740: {
                items: 4
            },
            1100: {
                items: 8
            }
        },
        nav: true
    };

    books: Book[] = [];

    @Input() genre: string;

    mediaSub: Subscription;
    deviceXs;
    userBook: boolean;
    bookStatus = BookStatus;
    routerlink: string;

    constructor(
        private gBooksService: GoogleBooksService,
        private router: Router,
        private bookService: BookService,
        private userbookService: UserbookService,
        public dialog: MatDialog,
        public mediaObserver: MediaObserver,
    ) {
    }

    ngOnInit(): void {
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
        this.getBooks();
        this.userBook = this.router.url.includes('my');
    }

    getBooks() {
        if (this.router.url.includes('my')) {
            this.routerlink = '/book/my/';
            this.getAllBooks();
        } else {
            this.gBooksService.searchByName(this.genre).subscribe(books => {
                this.routerlink = '/book/';
                this.books = this.bookService.convertBookToBookList(books['items']);
            });
        }

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
            if (this.router.url.includes('my')) {
                this.getAllBooks();
            }
        });
    }

    getAllBooks() {
        this.bookService.getAllBooks().subscribe(value => {
            this.books = value;
        });

    }

    changeStatusBook(bookStatus: BookStatus, id: number, book: Book) {
        let userBookUpdateStatusTO = {
            'id': id,
            status: mapBookStatus.get(bookStatus)
        };
        console.log(userBookUpdateStatusTO);
        this.userbookService.changeStatus(userBookUpdateStatusTO).subscribe(value => {
                console.log(value);
                this.books[this.books.indexOf(book)].status = value.status;
            },
            error => {
                console.log(error);
            });
    }

    verifyrouter(): boolean {
        return this.router.url.includes('my');
    }

    ngOnDestroy(): void {
        this.mediaSub.unsubscribe();
    }

}
