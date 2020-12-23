import { ReadingTargetComponent } from './../../shared/reading-target/reading-target.component';
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
import { ReferBookDialogComponent } from '../../shared/refer-book-dialog/refer-book-dialog.component';
import {PageEvent} from '@angular/material/paginator';
import {ReviewsPagination} from '../../../models/pagination/reviews.pagination';

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


    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private readingTrackingService: ReadingTrackingService,
        private gBookService: GoogleBooksService,
        private bookService: BookService,
        private trackingService: TrackingService,
        public authService: AuthService,
        private reviewService: ReviewService,
        private profileService: ProfileService,
        private translate: TranslateService
    ) {
        this.inscricao = this.route.data.subscribe((data: { book: Book }) => {
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

    getBook(): void {
        if (this.book.api === 'google') {
            this.bookService.getAllUserBooks().subscribe((userbooks) => {
                this.gBookService.getById(this.book.id).subscribe(b => {
                    const book = this.bookService.convertBookToModel(b);
                    userbooks.books.forEach(userbook => {
                        if (userbook.idBookGoogle === book.id) {
                            book.status = userbook.status;
                            book.idUserBook = userbook.id;
                            book.finishDate = userbook.finishDate;
                        }
                    });
                    this.book = book;
                });
            });
        } else {
            this.bookService.getAllUserBooks().subscribe((userbooks) => {
                // tslint:disable-next-line:radix
                this.bookService.getById(Number.parseInt(this.book.id)).subscribe(b => {
                    userbooks.books.forEach(userbook => {
                        if (userbook.idBook === b.id) {
                            b.status = userbook.status;
                            b.idUserBook = userbook.id;
                            b.finishDate = userbook.finishDate;
                            console.log(userbook);

                        }
                    });
                    this.book = b;
                });
            });
        }
    }

    // getAllReadingTracking() {
    //     this.readingTrackingService.getAllByUserBook(this.book.idUserBook).pipe(take(1)).subscribe(trackings => {
    //             this.readingTracking = trackings
    //                 .slice()
    //                 .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    //             this.percentage = this.getPercentTotal();
    //         },
    //         error => {
    //             console.log('error tracking all by idbook', error);
    //         });
    // }
    getAllTracking() {
        if (this.book?.idUserBook) {
            this.trackingService.getAllByUserBook(this.book.idUserBook).pipe(take(1)).subscribe(trackings => {
                    this.trackings = trackings
                        .slice()
                        .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
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
        dialogRef.afterClosed().subscribe(() => {
            this.getBook();
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

    openDialogReadingTarget(book: Book) {
        const dialogRef = this.dialog.open(ReadingTargetComponent, {
            height: '400px',
            width: '600px',
            data: {
                book
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getBook();
        });
    }

    addReadingTarget(): void {

    }

    isReadingTarget() : boolean {
        return false;
    }

    public calculateDays(): string {
        let date1 = new Date();
        let date2 = new Date('12/31/' + date1.getFullYear());
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays.toString();
      
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
