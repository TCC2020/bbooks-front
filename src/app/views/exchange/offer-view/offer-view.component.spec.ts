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

describe('OfferViewComponent', () => {
    let component: OfferViewComponent;
    let fixture: ComponentFixture<OfferViewComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
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
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfferViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
