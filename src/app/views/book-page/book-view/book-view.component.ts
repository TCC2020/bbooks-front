import {ReadingTargetService} from './../../../services/reading-target.service';
import {ReadingTargetTO} from './../../../models/readingTargetTO.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../../models/book.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {map, switchMap, take} from 'rxjs/operators';
import {ReadingTrackingTO} from '../../../models/ReadingTrackingTO.model';
import {TrackingDialogComponent} from '../tracking-dialog/tracking-dialog.component';
import {ReadingTrackingService} from '../../../services/reading-tracking.service';
import {
    BookStatus,
    BookStatusEnglish,
    mapBookStatusEnglish
} from '../../../models/enums/BookStatus.enum';
import {BookAddDialogComponent} from '../../shared/book-add-dialog/book-add-dialog.component';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookService} from '../../../services/book.service';
import {TrackingViewComponent} from '../tracking-view/tracking-view.component';
import {TrackingTO} from '../../../models/TrackingTO.model';
import {TrackingService} from '../../../services/tracking.service';
import {ReviewTO} from '../../../models/ReviewTO.model';
import {AuthService} from '../../../services/auth.service';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';
import {ReviewService} from '../../../services/review.service';
import {ProfileService} from '../../../services/profile.service';
import {TranslateService} from '@ngx-translate/core';
import {ReferBookDialogComponent} from '../../shared/refer-book-dialog/refer-book-dialog.component';
import {PageEvent} from '@angular/material/paginator';
import {ReviewsPagination} from '../../../models/pagination/reviews.pagination';
import {UserbookService} from '../../../services/userbook.service';
import {UserBooksDataStatusTO} from '../../../models/UserBooksDataStatusTO.model';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-book-view',
    templateUrl: './book-view.component.html',
    styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit, OnDestroy {

    inscricao: Subscription;
    book: Book = new Book();
    userBooksDataStatusTO: UserBooksDataStatusTO;
    stars: number[] = [1, 2, 3, 4, 5];
    rating = 1;
    stringAuthors: string[];
    readingTracking: ReadingTrackingTO[] = [];
    trackings: TrackingTO[] = [];

    status = BookStatus;
    mapEnglish = mapBookStatusEnglish;
    statusEnglish = BookStatusEnglish;
    panelOpenState = true;
    percentage: number;

    reviews: Observable<ReviewTO[]>;
    reviewPagination: ReviewsPagination;

    pageEvent: PageEvent = new PageEvent();

    public readingTargetTO = new ReadingTargetTO();
    readingTargets: Observable<ReadingTargetTO[]>;

    hasReadingTarget: boolean;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private readingTrackingService: ReadingTrackingService,
        private gBookService: GoogleBooksService,
        private bookService: BookService,
        private trackingService: TrackingService,
        public authService: AuthService,
        private reviewService: ReviewService,
        private readingTargetService: ReadingTargetService,
        private profileService: ProfileService,
        private translate: TranslateService,
        private userBookService: UserbookService
    ) {
        Util.loadingScreen();
        this.inscricao = this.route.data.subscribe((data: { book: Book }) => {
            Util.stopLoading();
            this.book = data.book;
            this.stringAuthors = this.convertAuthorsToString();
            if (this.book?.idUserBook > 0) {
                this.getAllTracking();
            }
        });
        this.pageEvent.pageSize = 10;
        this.pageEvent.pageIndex = 0;
    }

    ngOnInit(): void {
        this.getBook();
        this.getAllReviews();
    }

    getDataStatusByGoogleBook(): void {
        Util.loadingScreen();
        this.userBookService.getDataStatusByBooksGoogleBook(this.book.id)
            .pipe(take(1))
            .subscribe(result => {
                    Util.stopLoading();
                    this.userBooksDataStatusTO = result;
                },
                error => {
                    console.log('Error: getDataStatusByBooksGoogleBook', error);
                });
    }

    getDataStatusByBookId(): void {
        Util.loadingScreen();
        this.userBookService.getDataStatusByBooksBookId(this.book.id)
            .pipe(take(1))
            .subscribe(result => {
                    Util.stopLoading();
                    this.userBooksDataStatusTO = result;
                },
                error => {
                    console.log('Error: getDataStatusByBooksGoogleBook', error);
                });
    }

    getBook(userbookResult?): void {
        Util.loadingScreen();
        if (this.book.api === 'google') {
            this.gBookService.getById(this.book.id).subscribe(b => {
                Util.stopLoading();
                const book = this.bookService.convertBookToModel(b);
                if (userbookResult) {
                    book.status = userbookResult.status;
                    book.idUserBook = userbookResult.id;
                    book.finishDate = userbookResult.finishDate;
                    this.book = book;
                    this.getDataStatusByGoogleBook();
                    this.verifyReadingTarget();
                } else {
                    this.bookService.getAllUserBooks().subscribe((userbooks) => {
                        userbooks.books.forEach(userbook => {
                            if (userbook.idBookGoogle === book.id) {
                                book.status = userbook.status;
                                book.idUserBook = userbook.id;
                                book.finishDate = userbook.finishDate;
                            }
                        });
                        Util.stopLoading();
                        this.book = book;
                        this.getDataStatusByGoogleBook();
                        this.verifyReadingTarget();
                    });
                }
            });
        } else {
            // tslint:disable-next-line:radix
            this.bookService.getById(Number.parseInt(this.book.id)).subscribe(b => {

                if (userbookResult) {
                    b.status = userbookResult.status;
                    b.idUserBook = userbookResult.id;
                    b.finishDate = userbookResult.finishDate;
                    this.book = b;
                    this.getDataStatusByGoogleBook();
                    this.verifyReadingTarget();
                } else {
                    this.bookService.getAllUserBooks().subscribe((userbooks) => {
                        userbooks.books.forEach(userbook => {
                            if (userbook.idBook === b.id) {
                                b.status = userbook.status;
                                b.idUserBook = userbook.id;
                                b.finishDate = userbook.finishDate;
                            }
                        });
                        this.book = b;
                        this.getDataStatusByBookId();
                        this.verifyReadingTarget();
                    });
                }
            });
        }
    }

    getAllTracking() {
        if (this.book?.idUserBook) {
            Util.loadingScreen();
            this.trackingService.getAllByUserBook(this.book.idUserBook).pipe(take(1)).subscribe(trackings => {
                    this.trackings = trackings
                        .slice()
                        .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                    Util.stopLoading();
                },
                error => {
                    console.log('error tracking all by idbook', error);
                });
        }
    }

    getByIdTrackingSpeed(id: string, tracking: TrackingTO) {
        this.trackingService.getById(id).pipe(take(1)).subscribe(result => {
                this.trackings[this.trackings.indexOf(tracking)].velocidadeLeitura = result.velocidadeLeitura;
            },
            error => {
                console.log('error tracking all by idbook', error);
            });
    }

    orderByDate(readingTracking: ReadingTrackingTO[]) {
        if (readingTracking) {
            return readingTracking
                .slice()
                .sort((a, b) =>
                    new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
                );
        }
        return [];
    }

    getPercentTotal(readingTrackings: ReadingTrackingTO[]): number {
        readingTrackings = this.orderByDate(readingTrackings);
        return readingTrackings[0]?.percentage ? readingTrackings[0].percentage : 0;
    }

    verifystatusBook(): boolean {
        return this.book.status === this.status.EMPRESTADO || !this.book.idUserBook;
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
        this.reviewPagination = new ReviewsPagination();
    }

    verifyPercentageIsLess100() {
        return this.percentage <= 100;
    }

    convertAuthorsToString(): string[] {
        const namesAuthors = this.book.authors.map(value => value.name);
        return namesAuthors;
    }

    openDialogAddBook(book: Book) {
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
            height: '450px',
            width: '400px',
            data: {
                book
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getBook(result);
        });
    }

    openDialogReview(r: ReviewTO): void {
        const review = new ReviewTO();
        if (r) {
            review.id = r.id;
            review.title = r.title;
            review.body = r.body;
            review.profileTO = r.profileTO;
        } else {
            review.profileId = this.authService.getUser().profile.id;
        }
        if (this.book.api) {
            review.idGoogleBook = this.book.id;
        } else {
            // tslint:disable-next-line:radix
            review.bookId = Number.parseInt(this.book.id);
        }
        const dialogRef = this.dialog.open(ReviewDialogComponent, {
            height: '450px',
            width: '500px',
            data: {
                review,
                book: this.book
            }
        });
        dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
            if (result) {
                this.getAllReviews();
            }
        });
    }

    openDialogReferBook(book: Book) {
        const dialogRef = this.dialog.open(ReferBookDialogComponent, {
            height: '580px',
            width: '680px',
            data: {
                book
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getBook();
        });
    }

    addToReadingTarget(): void {
        this.readingTargetService.addTarget(this.authService.getUser().profile.id, this.book.idUserBook).subscribe(
            () => {
                alert('Livro adicionado à Meta de Leitura');
                this.verifyReadingTarget();
            },
            error => {
                console.log('ReadingTarget Error', error);
            }
        );
    }

    removeFromReadingTarget(): void {
        this.readingTargetService.removeTarget(this.authService.getUser().profile.id, this.book.idUserBook).subscribe(
            () => {
                alert('Livro removido da Meta de Leitura');
                this.verifyReadingTarget();
            },
            error => {
                console.log('ReadingTarget Error', error);
            }
        );
    }

    verifyReadingTarget(): void {
        this.readingTargetService.getByUserBookId(this.authService.getUser().profile.id, this.book.idUserBook).subscribe(
            (res) => {
                res?.id ? this.hasReadingTarget = true : this.hasReadingTarget = false;
            },
            error => {
                console.log('ReadingTarget Error', error);
            }
        );
    }

    public calculateDays(): string {
        const currentDate = new Date();
        const lastDayOfYear = new Date('12/31/' + currentDate.getFullYear());
        const diffenceOfDates = Math.abs(lastDayOfYear.getTime() - currentDate.getTime());
        const differenceInDays = Math.ceil(diffenceOfDates / (1000 * 3600 * 24));
        return differenceInDays.toString();
    }

    openDialogReadingTracking(track: TrackingTO, tracking: ReadingTrackingTO, editPag: boolean, trackingUpId: string) {
        const dialogRef = this.dialog.open(TrackingDialogComponent, {
            height: '300px',
            width: '400px',
            data: {
                tracking,
                idUserbook: this.book.idUserBook,
                canEditPag: editPag,
                trackingUpId
            }
        });
        dialogRef.afterClosed().pipe(switchMap(async res => {
            return await res;

        })).subscribe((result) => {
            if (result) {
                if (result === 'delete') {
                    track.finishedDate = null;
                    track.trackings.splice(track.trackings.indexOf(tracking), 1);
                }
                if (tracking) {
                    tracking = result;
                    this.getByIdTrackingSpeed(track.id, track);
                } else {
                    track.trackings.push(result);
                    this.getByIdTrackingSpeed(track.id, track);
                }
            }
            this.getBook();
        });
    }

    openDialogTrackingView(tracking: TrackingTO) {

        const dialogRef = this.dialog.open(TrackingViewComponent, {
            height: '300px',
            width: '400px',
            data: {
                tracking,
                idUserbook: this.book.idUserBook,
            }
        });
        dialogRef.afterClosed().pipe(switchMap(async res => {
            return await res;
        })).subscribe((res) => {
            this.getBook();
            if (tracking) {
                tracking = res;
            } else {
                if (res) {
                    this.getAllTracking();
                }
            }
        });
    }

    getStatus(readingTrackings: ReadingTrackingTO[]): string {
        if (readingTrackings?.length > 0) {
            readingTrackings = this.orderByDate(readingTrackings);
            return readingTrackings[0].percentage.toString() === '100' ? 'concluido' : 'pending';
        } else {
            return 'pending';

        }
    }

    getConcluidos(status: string): number {
        let response = 0;
        this.trackings.forEach(tracking => {
            if (status === this.getStatus(tracking.trackings)) {
                response++;
            }
        });
        return response;
    }

    getStatusTranslate(readings: ReadingTrackingTO[]): string {
        const resp = this.getStatus(readings);
        if (resp === 'concluido') {
            return 'PADRAO.CONCLUIDO';
        } else {
            return 'PADRAO.PENDENTE';
        }
    }

    delete(id: string): void {
        this.trackingService.delete(id).pipe(take(1)).subscribe(() => {
                alert('tracking removed');
                this.getAllTracking();
            },
            error => {
                console.log(error);
            });
    }

    getAllReviews(): void {
        if (this.book.api === 'google') {
            this.getAllByGoogleBook();
        } else {
            this.getAllByBook();
        }
    }

    deleteReview(r: ReviewTO): void {
        this.reviewService.delete(r.id)
            .pipe(take(1))
            .subscribe(() => {
                this.reviews = this.reviews.pipe(take(1));
                this.translate.get('RESENHA.APAGAR_RENHA').subscribe(message => {
                    alert(message);
                });
            });
    }

    changePage(event: PageEvent) {
        this.pageEvent = event;
        this.getAllReviews();
    }

    getAllByGoogleBook(): void {
        this.reviewService.getAllByGoogleBook(
            this.book.id,
            this.pageEvent.pageSize,
            this.pageEvent.pageIndex
        )
            .pipe(take(1))
            .subscribe(reviewsPagination => {
                this.reviewPagination = reviewsPagination;
            });
    }

    getAllByBook(): void {
        this.reviewService.getAllByBook(
            // tslint:disable-next-line:radix
            Number.parseInt(this.book.id),
            this.pageEvent.pageSize,
            this.pageEvent.pageIndex
        )
            .pipe(take(1))
            .subscribe(reviewsPagination => {
                this.reviewPagination = reviewsPagination;
            });
    }

}
