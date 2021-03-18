import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {BookMonthTO} from '../../../models/BookMonthTO.model';
import {UserbookService} from '../../../services/userbook.service';
import {AuthService} from '../../../services/auth.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookService} from '../../../services/book.service';
import {BookCase} from '../../../models/bookCase.model';
import {Book} from '../../../models/book.model';
import {BookAddDialogComponent} from '../../shared/book-add-dialog/book-add-dialog.component';
import {SearchBookComponent} from '../../shared/search-book/search-book.component';
import {MatDialog} from '@angular/material/dialog';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-book-month',
    templateUrl: './book-month.component.html',
    styleUrls: ['./book-month.component.scss']
})
export class BookMonthComponent implements OnInit {

    groupId: string;
    bookMonthTO: BookMonthTO[] = [];
    bookMonth: BookMonthTO;
    bookCase: BookCase = new BookCase();
    book: Book;
    currentDate = new Date();

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private userBookService: UserbookService,
        private user: AuthService,
        private gBooksService: GoogleBooksService,
        private bookService: BookService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.route.parent.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.groupId = result;
                    this.getBookMonth();
                }
            );
    }

    getBookMonth() {
        this.groupService.getBookMonth(this.groupId)
            .pipe(take(1))
            .subscribe(result => {
                this.bookMonthTO = result;
                this.bookMonth = this.bookMonthTO[this.bookMonthTO.length - 1];
                this.getBookCase();
            }, error => {
                console.log(error);
            });
    }

    getBookCase() {
        if (this.bookMonth.bookGoogleId) {
            this.gBooksService.getById(this.bookMonth.bookGoogleId).subscribe(book => {
                const b = this.bookService.convertBookToModel(book);
                this.book = b;

            });
        } else {
            this.bookService.getById(this.bookMonth.bookid)
                .subscribe(b => {
                    this.book = b;
                });
        }
    }

    addBookMonth() {
        const dialogRef = this.dialog.open(SearchBookComponent, {
            height: '450px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            Util.loadingScreen();
            const bookM: BookMonthTO = new BookMonthTO();
            bookM.groupId = this.groupId;
            bookM.bookGoogleId = result?.id;
            bookM.monthYear = new Date();
            bookM.bookid = null;
            this.groupService.postBookMonth(this.groupId, bookM)
                .pipe(take(1))
                .subscribe(() => {
                    Util.stopLoading();
                    Util.showSuccessDialog('Livro adicionado');
                    window.location.reload();
                }, error => {
                    Util.stopLoading();
                    console.log(error);
                });
        });
    }

    deleteBookMonth() {
        Util.loadingScreen();
        this.groupService.deleteBookMonth(this.groupId, this.bookMonth.id)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                Util.showSuccessDialog('Livro excluído!');
                window.location.reload();
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }
}
