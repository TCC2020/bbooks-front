import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GoogleBooksService} from '../../../../services/google-books.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../../../../services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {Book} from "../../../../models/book.model";
import {BookAddDialogComponent} from "../../book-add-dialog/book-add-dialog.component";

@Component({
    selector: 'app-carrousel',
    templateUrl: './carrousel.component.html',
    styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

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

    books: any[] = [];


    @Input() genre: string;


    constructor(
        private gBooksService: GoogleBooksService,
        private router: Router,
        private bookService: BookService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.getBooks();
    }

    getBooks() {
        if (this.router.url.includes('my')) {
            this.getAllBooks();
        } else {
            this.gBooksService.searchByName(this.genre).subscribe(books => {
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
        dialogRef.afterClosed().subscribe( () => {
            this.getAllBooks();
        });
    }

    getAllBooks() {
        this.books = this.bookService.getBookCase().find(value => value.description === this.genre).books;
    }

    verifyrouter(): boolean {
        return this.router.url.includes('my');
    }

}
