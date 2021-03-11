import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {UserService} from '../../services/user.service';
import {UserbookService} from '../../services/userbook.service';
import {GoogleBooksService} from '../../services/google-books.service';
import {AuthService} from '../../services/auth.service';
import {map, take} from 'rxjs/operators';
import {BookCase} from '../../models/bookCase.model';
import {Util} from '../shared/Utils/util';
import {Book} from '../../models/book.model';

@Component({
    selector: 'app-time-line',
    templateUrl: './time-line.component.html',
    styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, AfterViewInit {

    title = 'app';

    alternate = false;
    toggle = false;
    color = false;
    dotAnimation = true;
    contentAnimation = true;
    size = 40;
    side = 'left';
    mobileWidthThreshold = 640;
    lastYear = 0;
    entries = [];
    books = [];
    loading = true;
    contIndex = -1;

    constructor(
        private bookService: BookService,
        private userBookService: UserbookService,
        private gBooksService: GoogleBooksService,
        private authservice: AuthService
    ) {
    }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
        this.loading = true;
        Util.loadingScreen();
        this.userBookService.getAllByProfileTimeLine(this.authservice.getUser().profile.id)
            .pipe(
                take(1),
                map(userBook => {
                    const books = [];
                    // @ts-ignore
                    userBook.books.forEach((realation) => {
                        // @ts-ignore
                        if (realation.idBookGoogle) {
                            this.gBooksService.getById(realation.idBookGoogle)
                                .pipe(take(1))
                                .subscribe(book => {
                                    const b = this.bookService.convertBookToModel(book);
                                    b.idUserBook = realation.id;
                                    b.status = realation.status;
                                    b.finishDate = realation.finishDate;
                                    books.push(b);
                                });
                        } else {
                            const id = realation.idBook ? realation.idBook : realation.book.id;
                            this.bookService.getById(id)
                                .pipe(take(1))
                                .subscribe(b => {
                                    b.idUserBook = realation.id;
                                    b.status = realation.status;
                                    b.finishDate = realation.finishDate;
                                    books.push(b);
                                });
                        }
                    });
                    return books;
                })
            )
            .pipe(take(1))
            .subscribe(books => {
                setTimeout(() => {
                    this.books = books;
                    // @ts-ignore
                    books = books.sort((a, b) => a.finishDate > b.finishDate);
                    books.forEach((b) => {
                        if (b.finishDate !== null && b.finishDate !== 0 && b.finishDate) {
                            const date = new Date(b.finishDate);
                            const year = date.getFullYear();
                            this.verifyDate(year, b);
                        }
                    });
                    this.loading = false;
                    Util.stopLoading();
                }, 2200);
            });
    }

    verifyDate(year: number, book?: Book): void {
        if (year > this.lastYear) {
            this.lastYear = year;
            this.addEntry(year, book);
            this.contIndex++;
        } else {
            this.addBookContent(this.contIndex, book);
        }
    }

    addEntry(year: number, book: Book) {
        this.entries.push({
            header: year,
            content: [book]
        });
    }

    addBookContent(i: number, book?: Book) {
        this.entries[i].content.push(book);
    }

    onExpand(event, index) {
        // console.log(event, index);
    }

    toggleSide() {
        this.side = this.side === 'left' ? 'right' : 'left';
    }

    ngAfterViewInit(): void {
    }


}
