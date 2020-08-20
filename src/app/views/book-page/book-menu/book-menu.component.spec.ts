import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookMenuComponent} from './book-menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookService} from "../../../services/book.service";

describe('BookMenuComponent', () => {
    let component: BookMenuComponent;
    let fixture: ComponentFixture<BookMenuComponent>;

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
            declarations: [BookMenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
