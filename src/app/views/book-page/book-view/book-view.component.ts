import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../../models/book.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BookAddDialogComponent} from '../book-add-dialog/book-add-dialog.component';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-book-view',
    templateUrl: './book-view.component.html',
    styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit, OnDestroy {

    inscricao: Subscription;
    book: Book = new Book();
    stars: number[] = [1, 2, 3, 4, 5];
    rating = 1;
    stringAuthors: string;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.inscricao = this.route.data.subscribe((data: { book: Book }) => {
            this.book = data.book;
            this.stringAuthors = this.convertAuthorsToString();
        });


    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

    convertAuthorsToString(): string {
        const namesAuthors = this.book.authors.map(value => value.name);
        return namesAuthors.toString();
    }

    openDialogAddBook(book: Book) {
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
            height: '450px',
            width: '400px',
            data: {
                book
            }
        });
        dialogRef.afterClosed().pipe(switchMap(async res => {
           return await res;
        })).subscribe((result) => {
            if (result) {
                    this.book.idUserBook = result?.id;
                    this.book.status = result?.status;
            }
        });
    }

}
