import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {GoogleBooksService} from '../../../../services/google-books.service';

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
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 4
            }
        },
        nav: true
    };

    books: any[] = [];

    @Input() genre: string;

    constructor(
        private gBooksService: GoogleBooksService
    ) {
    }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks() {
        this.gBooksService.searchByName(this.genre).subscribe(books => {
            this.books = books['items'];
        });
    }

}
