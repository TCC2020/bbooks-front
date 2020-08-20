import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookViewComponent} from './book-view.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('BookViewComponent', () => {
    let component: BookViewComponent;
    let fixture: ComponentFixture<BookViewComponent>;

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
                RouterTestingModule
            ],
            providers: [
                GoogleBooksService,
                BookService,
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: GoogleLoginProvider.PROVIDER_ID,
                                provider: new GoogleLoginProvider(
                                    '637875920121-2l5ibvruevm5ldf5gdc78erdno23pd2b.apps.googleusercontent.com'
                                ),
                            }
                        ],
                    } as SocialAuthServiceConfig
                }
            ],
            declarations: [BookViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
