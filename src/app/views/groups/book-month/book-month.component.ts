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

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private userBookService: UserbookService,
        private user: AuthService,
        private gBooksService: GoogleBooksService,
        private bookService: BookService
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
                console.log(this.bookMonth);
            }, error => {
                console.log(error);
            });
    }

    getBookCase() {
        this.userBookService.getAllByProfile(this.user.getUser().profile.id)
            .pipe(take(1))
            .subscribe(userBook => {
                userBook.books.forEach(realation => {
                    if (realation.idBookGoogle) {
                        this.gBooksService.getById(realation.idBookGoogle).subscribe(book => {
                            const b = this.bookService.convertBookToModel(book);
                            b.idUserBook = realation.id;
                            b.status = realation.status;
                            b.finishDate = realation.finishDate;
                            this.book = b;

                        });
                    } else {
                        const id = realation.idBook ? realation.idBook : realation.book.id;
                        this.bookService.getById(id)
                            .subscribe(b => {
                                b.idUserBook = realation.id;
                                b.status = realation.status;
                                b.finishDate = realation.finishDate;
                                this.book = b;
                            });
                    }
                });
            });
    }

}
