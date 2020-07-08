import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit {
    books;
    search;
    busca: string = 'o menino';
    bookStatusFilter: string[] = ['lidos', 'lendo', 'a ler'];
    constructor(
        private fb: FormBuilder,
        private gBooksService: GoogleBooksService
    ) {
    }

    ngOnInit(): void {
        this.searchBook();
    }

    searchBook() {
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
