import { trackingsMock } from './../../../mocks/tracking.model.mock';
import { TrackingService } from './../../../services/tracking.service';
import { ReadingTargetService } from './../../../services/reading-target.service';
import { ReadingTrackingService } from './../../../services/reading-tracking.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookViewComponent} from './book-view.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookService} from '../../../services/book.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {bookMock, booksMock} from '../../../mocks/book.model.mock';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {reviewMock, reviewsMock} from '../../../mocks/review.model.mock';
import {trackingMock} from '../../../mocks/tracking.model.mock';
import {readingTrackingMock} from '../../../mocks/tracking.model';
import { readingTargetMock } from 'src/app/mocks/reading-target.model.mock';
import { BookStatus } from 'src/app/models/enums/BookStatus.enum';
import {Book} from '../../../models/book.model';
import {userbookMock, userbooksMock} from '../../../mocks/userbook.model.mock';
import {gBookMock} from '../../../mocks/google-book.model.mock';
import {UserbookService} from '../../../services/userbook.service';

describe('BookViewComponent', () => {
    let component: BookViewComponent;
    let fixture: ComponentFixture<BookViewComponent>;
    let httpReadingTarget: ReadingTargetService;
    let httpTrackingService: TrackingService;
    let gBookServiceMock: GoogleBooksService;
    let booksServiceMock: BookService;


    const routeMock = {
        data: of({book: bookMock})
    };
    const userMock = {
        profile: {
            id: 10
        }
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                HttpClientTestingModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                MaterialModule,
                RouterTestingModule,
                TranslateServiceMockForChild
            ],
            providers: [
                GoogleBooksService,
                BookService,
                SocialAuthServiceConfigMock,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                TranslateService,
                TranslateStore,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                UserbookService
            ],
            declarations: [BookViewComponent]
        }).compileComponents();
        httpReadingTarget = TestBed.inject(ReadingTargetService);
        httpTrackingService = TestBed.inject(TrackingService);
        gBookServiceMock = TestBed.inject(GoogleBooksService);
        booksServiceMock = TestBed.inject(BookService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookViewComponent);
        component = fixture.componentInstance;
        component.book = bookMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('book in component', () => {
        expect(component.book).toEqual(bookMock);
    });

    it('convertAuthorsToString', () => {
        const result = component.book.authors.map(value => value.name);
        component.convertAuthorsToString().forEach(r => {
            expect(r).toEqual(result.toString());
        });
    });

    it('should open openDialogAddBook ', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogAddBook(bookMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should open openDialogReview ', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogReview(reviewMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should open openDialogReferBook ', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogReferBook(bookMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should open openDialogTrackingView ', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogTrackingView(trackingMock);
        expect(spy).toHaveBeenCalled();
    });

    it('should open openDialogReadingTracking ', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogReadingTracking(trackingMock, readingTrackingMock, true, trackingMock.id);
        expect(spy).toHaveBeenCalled();
    });

    it('addToReadingTarget: should add',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'addTarget').mockReturnValue(of(readingTargetMock));
        component.addToReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('removeFromReadingTarget: should remove',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'removeTarget').mockReturnValue(of(null));
        component.removeFromReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('verifyReadingTarget: should search and return BookUserId',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'getByUserBookId').mockReturnValue(of(readingTargetMock));
        component.verifyReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('addToReadingTarget: should add error',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'addTarget').mockReturnValue(throwError('error'));
        component.addToReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('removeFromReadingTarget: should remove error',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'removeTarget').mockReturnValue(throwError('error'));
        component.removeFromReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('verifyReadingTarget: should search and return BookUserId error',  done => {
        component.book = bookMock;
        const spy = jest.spyOn(httpReadingTarget, 'getByUserBookId').mockReturnValue(throwError('error'));
        component.verifyReadingTarget();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id, bookMock.idUserBook);
        done();
    });

    it('getAllTracking: should search all trackings',  done => {
        component.book.idUserBook = 10;
        const spy = jest.spyOn(httpTrackingService, 'getAllByUserBook').mockReturnValue(of(trackingsMock));
        component.getAllTracking();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookMock.idUserBook);
        done();
    });

    it('getAllTracking: should search all trackings error',  done => {
        component.book.idUserBook = 10;
        const spy = jest.spyOn(httpTrackingService, 'getAllByUserBook').mockReturnValue(throwError('error'));
        component.getAllTracking();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookMock.idUserBook);
        done();
    });

    it('verifyPercentageIsLess100: should be false',  () => {
        component.percentage = 150;
        expect(component.verifyPercentageIsLess100()).toBeFalsy();
    });

    it('verifyPercentageIsLess100: should be true',  () => {
        component.percentage = 50;
        expect(component.verifyPercentageIsLess100()).toBeTruthy();
    });

    it('verifystatusBook: should be false',  () => {
        expect(component.verifystatusBook()).toBeFalsy();
    });

    it('verifystatusBook: should be true',  () => {
        component.book.idUserBook = 10;
        component.book.status = BookStatus.EMPRESTADO;
        expect(component.verifystatusBook()).toBeTruthy();
    });


    it('should getBook by google api', done => {
        component.book = bookMock;
        component.book.api = 'google';
        gBookMock.id = 10;
        // @ts-ignore
        userbookMock.books = [];
        // @ts-ignore
        userbookMock.books = booksMock;
        // @ts-ignore
        userbookMock.books[0].idBookGoogle = 10;
        const spyUserbooks = jest.spyOn(booksServiceMock, 'getAllUserBooks').mockReturnValue(of(userbookMock));
        const spyGbook = jest.spyOn(gBookServiceMock, 'getById').mockReturnValue(of(gBookMock));

        component.getBook();
        expect(spyUserbooks).toHaveBeenCalled();
        expect(spyGbook).toHaveBeenCalled();
        expect(spyGbook).toHaveBeenCalledWith(bookMock.id);
        done();
    });


    it('should getBook by bbooks api', done => {
        bookMock.id = '10';
        component.book = bookMock;
        component.book.api = '';
        // @ts-ignore
        userbookMock.books = [];
        // @ts-ignore
        userbookMock.books = booksMock;
        // @ts-ignore
        userbookMock.books[0].idBook = '10';
        const spyUserbooks = jest.spyOn(booksServiceMock, 'getAllUserBooks').mockReturnValue(of(userbookMock));
        const spyGbook = jest.spyOn(booksServiceMock, 'getById').mockReturnValue(of(bookMock));

        component.getBook();
        expect(spyUserbooks).toHaveBeenCalled();
        expect(spyGbook).toHaveBeenCalled();
        done();
    });
});
