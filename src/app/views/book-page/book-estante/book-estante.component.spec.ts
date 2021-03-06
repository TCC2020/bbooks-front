import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookEstanteComponent} from './book-estante.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookService} from '../../../services/book.service';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {bookcaseMock} from '../../../mocks/bookcase.model.mock';
import {BehaviorSubject, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {BookStatus, getArrayStatus} from '../../../models/enums/BookStatus.enum';
import {bookMock} from '../../../mocks/book.model.mock';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('BookEstanteComponent', () => {
    let component: BookEstanteComponent;
    let fixture: ComponentFixture<BookEstanteComponent>;
    let mockMediaSubject: any;
    const routeMock = {
        data: of({bookcase: bookcaseMock})
    };
    const mediaChange = new MediaChange();
    mediaChange.mqAlias = 'xs';
    beforeEach(async(() => {
        mockMediaSubject = new BehaviorSubject([mediaChange]);
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [BookEstanteComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                SocialLoginModule,
                TranslateServiceMockForChild
            ],
            providers: [
                BookService,
                SocialAuthServiceConfigMock,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                {
                    provide: MediaObserver,
                    useValue: {asObservable: jest.fn(() =>  of([mediaChange]))}
                },
                TranslateService,
                TranslateStore,
             ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookEstanteComponent);
        component = fixture.componentInstance;
        component.allStatus = getArrayStatus();
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test _filter status', () => {
        const result = component._filter(BookStatus.RELENDO);
        result.forEach(status => {
            expect(BookStatus.RELENDO).toEqual(status);
        });
    });

    it('test filterStatus() of book without filter', () => {
        const result = component.filterStatus();
        expect(component.bookCase.books).toEqual(result);
    });

    // it('test filterStatus() of book with filter', () => {
    //     component.filter = [BookStatus.LENDO, BookStatus.QUERO_LER]
    //     const result = component.filterStatus();
    //     const books = [];
    //     component.bookCase.books.filter((book) => {
    //
    //         this.translate.get('STATUS.' + book.status).subscribe(statusBook => {
    //             for (const status of this.filter) {
    //                 if (status === statusBook) {
    //                     books.push(book);
    //                 }
    //             }
    //         });
    //     });
    //     expect(books).toEqual(result);
    // });

    it('test filterBooks() of book without search', () => {
        const result = component.filterBooks();
        expect(component.bookCase.books).toEqual(result);
    });

    it('test filterBooks() of book with search', () => {
        component.search = 'Test para filtro do titulo';
        const result = component.filterBooks();
        expect(result[0]).toEqual(bookMock);
    });
});
