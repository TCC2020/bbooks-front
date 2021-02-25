import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferViewComponent} from './offer-view.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {BookService} from '../../../services/book.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookAdsService} from '../../../services/book-ads.service';
import {UserService} from '../../../services/user.service';
import {userMock} from '../../../mocks/user.model.mock';
import {AuthService} from '../../../services/auth.service';
import {of, throwError} from 'rxjs';
import {bookAdMock} from '../../../mocks/book-ad.mock';
import {errorMock} from '../../../mocks/error.model.mock';
import {bookMock, booksMock} from '../../../mocks/book.model.mock';
import {gBookMock} from '../../../mocks/google-book.model.mock';
import {userbookMock} from '../../../mocks/userbook.model.mock';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {groupMock} from '../../../mocks/group.mock';
import {ActivatedRoute} from '@angular/router';

describe('OfferViewComponent', () => {
    let component: OfferViewComponent;
    let fixture: ComponentFixture<OfferViewComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    const routeMock = {
        snapshot: {
            paramMap: {
                    get: jest.fn(() => 'sdfafafasfsadf')
                }
        },
        parent: new MockActivatedRoute({
            params: {id: 'teste'}
        }),
        data: of({groupTo: groupMock})
    };
    let bookAdsServiceMock;
    let booksServiceMock: BookService;
    let gBookServiceMock: GoogleBooksService;
    let userServiceMock: UserService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OfferViewComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForRoot,
            ],
            providers: [
                BookService,
                GoogleBooksService,
                BookAdsService,
                UserService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
            ]
        }).compileComponents();
        bookAdsServiceMock = TestBed.inject(BookAdsService);
        gBookServiceMock = TestBed.inject(GoogleBooksService);
        booksServiceMock = TestBed.inject(BookService);
        userServiceMock = TestBed.inject(UserService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfferViewComponent);
        component = fixture.componentInstance;
        component.bookAdTO = bookAdMock;
        fixture.detectChanges();
    });

    it('should create over view component', () => {
        expect(component).toBeTruthy();
    });

    it('should deleteService', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'delete').mockReturnValue(of(null));
        component.deleteService(bookAdMock.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookAdMock.id);
    });

    it('should deleteService catch error', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'delete').mockReturnValue(throwError(errorMock));
        component.deleteService(bookAdMock.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookAdMock.id);
    });

    it('should verify error BAD003', () => {
        const spy = jest.spyOn(component, 'verifyErrorOfferView');
        errorMock.error.message = 'BAD003';
        component.verifyErrorOfferView(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });

    it('should getBook by google api on offer view component', done => {
        component.bookAdTO.idBookGoogle = '101010101010110';
        gBookMock.id = 10;
        // @ts-ignore
        userbookMock.books = [];
        // @ts-ignore
        userbookMock.books = booksMock;
        // @ts-ignore
        userbookMock.books[0].idBookGoogle = 10;
        const spyGbook = jest.spyOn(gBookServiceMock, 'getById').mockReturnValue(of(gBookMock));

        component.getBook();
        expect(spyGbook).toHaveBeenCalled();
        expect(spyGbook).toHaveBeenCalledWith(bookMock.id);
        done();
    });

    it('should getBook by bbooks api offer view component', done => {
        component.bookAdTO.idBookGoogle = null;
        // @ts-ignore
        userbookMock.books = [];
        // @ts-ignore
        userbookMock.books = booksMock;
        // @ts-ignore
        userbookMock.books[0].idBook = '10';
        const spyGbook = jest.spyOn(booksServiceMock, 'getById').mockReturnValue(of(bookMock));

        component.getBook();
        expect(spyGbook).toHaveBeenCalled();
        done();
    });


    it('should get offer', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'getById').mockReturnValue(of(bookAdMock));
        component.getOffer();
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should get offer and catch error', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'getById').mockReturnValue(of(throwError(errorMock)));
        component.getOffer();
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should get user offer', () => {
        const spy = jest.spyOn(userServiceMock, 'getById').mockReturnValue(of(userMock));
        component.getUserOffer();
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });


});
