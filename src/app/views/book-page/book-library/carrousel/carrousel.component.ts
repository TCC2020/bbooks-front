import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GoogleBooksService} from '../../../../services/google-books.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookService} from "../../../../services/book.service";

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
            940: {
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
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {

        this.getBooks();
    }

    getBooks() {
        if (this.router.url.includes('my')) {
            this.books = this.bookService.getBookCase().find(value => value.description === this.genre).books;
        } else {
            this.gBooksService.searchByName(this.genre).subscribe(books => {
                this.books = this.bookService.convertBookToBookList(books['items']);
            });
        }

    }

}
