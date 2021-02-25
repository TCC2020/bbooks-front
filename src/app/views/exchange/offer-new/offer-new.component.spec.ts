import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferNewComponent} from './offer-new.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {ConsultaCepService} from '../../../services/consulta-cep.service';
import {CDNService} from '../../../services/cdn.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookAdsService} from '../../../services/book-ads.service';
import {userMock} from '../../../mocks/user.model.mock';
import {of} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {bookMock} from '../../../mocks/book.model.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';

describe('OfferNewComponent', () => {
    let component: OfferNewComponent;
    let fixture: ComponentFixture<OfferNewComponent>;
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
            declarations: [OfferNewComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForRoot,
                NgxMatIntlTelInputModule
            ],
            providers: [
                ConsultaCepService,
                CDNService,
                GoogleBooksService,
                BookAdsService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfferNewComponent);
        component = fixture.componentInstance;
        component.book = bookMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
