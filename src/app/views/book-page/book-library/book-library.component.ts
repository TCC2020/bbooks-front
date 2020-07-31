import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-book-library',
    templateUrl: './book-library.component.html',
    styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {
    @Input() genres: string;

    constructor(
    ) {
    }

    ngOnInit(): void {
    }
}
