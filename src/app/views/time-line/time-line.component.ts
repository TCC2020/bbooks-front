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
import {Observable, Subject, zip} from 'rxjs';

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
    entries = [];
    books = [];
    loading = true;
    list: Subject<any> = new Subject();

    constructor(
        private bookService: BookService,
        private userBookService: UserbookService,
        private gBooksService: GoogleBooksService,
        private authservice: AuthService
    ) {
    }

    async ngOnInit() {
        this.getBooks();
        this.loading = true;
        Util.loadingScreen();

    }

    getBooks(): void {
        this.userBookService.getAllByProfileTimeLine(this.authservice.getUser().profile.id)
            .pipe(
                take(1),
                map(userBook => {
                    const bookObservable = [];
                    userBook.books.forEach((realation) => {
                        let id;
                        let getById;
                        if (!realation.idBookGoogle) {
                            id = realation.idBook ? realation.idBook : realation.book.id;
                            getById = this.bookService.getById(id)
                                .pipe(
                                    take(1),
                                    map(b => {
                                        b.idUserBook = realation.id;
                                        b.status = realation.status;
                                        b.finishDate = realation.finishDate;
                                        return b;
                                    })
                                );
                        } else {
                            getById = this.gBooksService.getById(realation.idBookGoogle)
                                .pipe(
                                    take(1),
                                    map(book => {
                                        const b = this.bookService.convertBookToModel(book);
                                        b.idUserBook = realation.id;
                                        b.status = realation.status;
                                        b.finishDate = realation.finishDate;
                                        return b;
                                    })
                                );
                        }
                        bookObservable.push(getById);
                    });
                    return bookObservable;
                }),
            ).pipe(take(1))
            .subscribe(books => {
                zip(
                    ...books
                ).pipe(
                    take(1)
                ).subscribe(r => {
                    this.books = r;
                    this.books.forEach((b) => {
                        if (b.finishDate !== null && b.finishDate !== 0 && b.finishDate) {
                            const date = new Date(b.finishDate);
                            const year = date.getFullYear();
                            this.verifyDate(year, b);
                        }
                    });
                    this.entries = this.entries.sort((a, b) => a.header - b.header);
                    this.loading = false;
                    Util.stopLoading();
                });
            });
    }

    verifyDate(year: number, book?: Book): void {
        const result = this.entries.find(r => r.header === year);
        if (result) {
            const index = this.entries.indexOf(result);
            this.entries[index].content.push(book);
        } else {
            this.addEntry(year, book);
        }
    }

    addEntry(year: number, book: Book) {
        this.entries.push({
            header: year,
            content: [book]
        });
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
