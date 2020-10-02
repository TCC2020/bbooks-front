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
import {bookMock} from '../../../mocks/book.model.mock';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('BookViewComponent', () => {
    let component: BookViewComponent;
    let fixture: ComponentFixture<BookViewComponent>;
    const routeMock = {
        data: of({book: bookMock})
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
                TranslateService,
                TranslateStore
            ],
            declarations: [BookViewComponent]
        }).compileComponents();
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
        expect(component.convertAuthorsToString()).toEqual(result.toString());
    });
});
