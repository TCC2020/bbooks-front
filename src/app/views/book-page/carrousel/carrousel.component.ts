import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GoogleBooksService} from '../../../services/google-books.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Book} from "../../../models/book.model";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {BookStatus, mapBookStatus} from "../../../models/enums/BookStatus.enum";
import {UserbookService} from "../../../services/userbook.service";

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

    @Output() updateBooks = new EventEmitter<any>();
    @Output() updateListCarrousel = new EventEmitter<any>();
    @Input() books: Book[];
    @Input() nameTag: string;
    @Input() idTag: number;
    mediaSub: Subscription;
    deviceXs;
    userBook: boolean;
    routerlink: string;

    constructor(
        private gBooksService: GoogleBooksService,
        private router: Router,
        public dialog: MatDialog,
        public mediaObserver: MediaObserver,
    ) {
    }

    ngOnInit(): void {
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
        this.userBook = this.router.url.includes('mybooks');
        if (!this.userBook) {
            this.routerlink = '/book/';
        } else {
           this.routerlink = '/mybooks/';
        }
    }
    bookReturn(event) {
        this.books[this.books.indexOf((event.book))].status = event.status;
        this.updateBooks.emit({ idbook: event.book.id, status: event.status});
    }

    ngOnDestroy(): void {
        this.mediaSub.unsubscribe();
    }

}
