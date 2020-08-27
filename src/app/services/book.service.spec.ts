import {TestBed} from '@angular/core/testing';

import {BookService} from './book.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "./auth.service";
import {UserbookService} from "./userbook.service";
import {GoogleBooksService} from "./google-books.service";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {SocialAuthServiceConfigMock} from "../mocks/google.provide.mock";

describe('BookService', () => {
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                SocialLoginModule
            ],
            providers: [
                AuthService,
                UserbookService,
                GoogleBooksService,
                SocialAuthServiceConfigMock
            ]
        });
        service = TestBed.inject(BookService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
