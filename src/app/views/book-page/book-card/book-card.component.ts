import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../../models/book.model";
import {BookStatus, mapBookStatus} from "../../../models/enums/BookStatus.enum";
import {Router} from "@angular/router";
import {UserbookService} from "../../../services/userbook.service";
import {BookAddDialogComponent} from "../book-add-dialog/book-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BookService} from "../../../services/book.service";

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

    @Output() bookReturn = new EventEmitter<any>();

    @Input() book: Book;

    @Input() deviceXs: boolean;

    @Input() idTag: number;

    bookStatus = BookStatus;

    routerlink: string;

    userBook: boolean;

    constructor(
        private router: Router,
        private userbookService: UserbookService,
        public dialog: MatDialog,
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {
        this.userBook = this.router.url.includes('mybooks');
        if (!this.userBook) {
            this.routerlink = '/book/';
        } else {
            this.routerlink = '/mybooks/';
        }
    }


    changeStatusBook(bookStatus: BookStatus, id: number, book: Book) {
        const userBookUpdateStatusTO = {
            'id': id,
            status: mapBookStatus.get(bookStatus)
        };
        this.userbookService.changeStatus(userBookUpdateStatusTO).subscribe(value => {
                this.bookReturn.emit({status: value.status, book});
            },
            error => {
                console.log('Error', error);
            });
    }

    openDialogAddBook(book: Book, tags: any) {
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
            height: '550px',
            width: '400px',
            data: {
                book,
                tags
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.bookService.updateListCarrousel.emit(true);
        });
    }

    verifyrouter(): boolean {
        return this.router.url.includes('my');
    }


}
