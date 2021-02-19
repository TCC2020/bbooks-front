import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BookService} from '../../../services/book.service';
import {BookSearchTO} from '../../../models/bookSearchTO.model';
import {map, take} from 'rxjs/operators';
import {Book} from '../../../models/book.model';
import {PageEvent} from '@angular/material/paginator';
import {Util} from '../Utils/util';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
    styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {
    formSearch: FormGroup;
    books: Book[] = [];
    totalBooks = 0;
    pageEvent: PageEvent = new PageEvent();
    pageSize = 10;

    constructor(
        public fb: FormBuilder,
        public bookService: BookService,
        public dialogRef: MatDialogRef<SearchBookComponent>,
    ) {
        this.formSearch = this.fb.group({
            search: ['']
        });
        this.pageEvent.pageSize = 10;
        this.pageEvent.pageIndex = 0;
    }

    ngOnInit(): void {
    }

    searchBooks(): void {
        const searchBook = new BookSearchTO();
        searchBook.search = this.formSearch.value.search.split(' ').join('+');
        searchBook.page = this.pageEvent.pageIndex;
        Util.loadingScreen();
        this.bookService.searchMergeBooks(searchBook, this.pageEvent.pageSize)
            .pipe(
                take(1),
                map(sb => {
                    sb.googleBooks.items ?
                        sb.googleBooks.items = sb.googleBooks.items.map(i => this.bookService.convertBookToModel(i)) :
                        sb.googleBooks.items = [];
                    return sb;
                }),
            )
            .subscribe(res => {
                    Util.stopLoading();
                    this.totalBooks = res.googleBooks.totalItems + res.books.totalElements;
                    this.books = [];
                    this.books = res.books.content.concat(res.googleBooks.items);
                    if (this.books.length < 0) {
                        this.books = [];
                        this.totalBooks = 0;
                    }
                },
                error => {
                    console.log('error search book', error);
                });
    }

    changePage(event: PageEvent) {
        this.pageEvent = event;
        this.searchBooks();
    }

    getBook(book: Book): void {
        this.dialogRef.close(book);
    }

}
