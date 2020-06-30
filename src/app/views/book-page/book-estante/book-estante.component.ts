import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit {
    books;
    searchControl;
    search;
    busca: string = 'o menino';

    constructor(private fb: FormBuilder,
                private gBooksService: GoogleBooksService) {
        this.searchControl = this.fb.group({
            search: ['']
        });
    }

    ngOnInit(): void {
        this.searchBook();
    }

    searchBook() {
        // this.searchControl.value.book?
        this.busca.split(' ').join('+');
        this.gBooksService.searchByName(this.busca.split(' ').join('+')).subscribe(books => {
            this.books = books['items'];
        });
    }

    filterBooks() {
        if (this.search === undefined || this.search.trim() === null) {
            return this.books;
        }
        return this.books.filter((book) => {
            if (book.volumeInfo.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) {
                return true;
            } else {
                return false;
            }
        });
    }

}
