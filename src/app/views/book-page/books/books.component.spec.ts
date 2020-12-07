import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';
import {of} from 'rxjs';
import {BookService} from '../../../services/book.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {ActivatedRoute} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {bookcasesMock} from '../../../mocks/bookcase.model.mock';
import {BookStatus} from '../../../models/enums/BookStatus.enum';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('BooksComponent', () => {
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    const routeMock = {
        data: of({bookcases: bookcasesMock})
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [BooksComponent],
            providers: [
                BookService,
                SocialAuthServiceConfigMock,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                TranslateService,
                TranslateStore
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(true).toBeTruthy();
    });

    it('bookcases in component', () => {
        expect(component.bookCases).toEqual(bookcasesMock);
    });

    it('updateBooksStatus', () => {
        const event = {
            idbook: '101010101010110',
            status: BookStatus.EMPRESTADO
        }
        component.updateBooksStatus(event);
        component.bookCases.forEach(bookcases => {
            bookcases.books.forEach(book => {
                if (book.id === event.idbook) {
                    expect(book.status).toEqual(event.status);
                }
            });
        });
    });
});
