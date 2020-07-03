import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookFormComponent} from '../book-form/book-form.component';
import {MatDialog} from '@angular/material/dialog';
import {BookService} from "../../../services/book.service";
import {BookcaseModalComponent} from "../bookcase-modal/bookcase-modal.component";

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit {
    bookcases: string[];
    books;
    search;
    busca: string = 'o menino';
    @Input() deviceXs: boolean;
    topVal = 0;
    constructor(
        private fb: FormBuilder,
        private gBooksService: GoogleBooksService,
        private bookService: BookService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.bookcases = this.bookService.getBookCase();
        this.searchBook();
    }

    onScroll(e) {
        let scrollXs = this.deviceXs ? 55 : 73;
        if (e.srcElement.scrollTop < scrollXs) {
            this.topVal = e.srcElement.scrollTop;
        } else {
            this.topVal = scrollXs;
        }
    }

    sideBarScroll() {
        let e = this.deviceXs ? 160 : 130;
        return e - this.topVal;
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

    openDialogBookCase(): void {
        const dialogRef = this.dialog.open(BookcaseModalComponent, {
            width: '300px',
            height: '200px'
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }

    openDialogForm() {
        const dialogRef = this.dialog.open(BookFormComponent, {
            width: '550px',
            height: '700px'
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }

}
