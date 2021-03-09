import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyOffersComponent} from './my-offers.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {errorMock} from '../../../mocks/error.model.mock';
import {bookAdMock, bookAdsMock} from '../../../mocks/book-ad.mock';
import {BookAdsService} from '../../../services/book-ads.service';
import {of, throwError} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';

describe('MyOffersComponent', () => {
    let component: MyOffersComponent;
    let fixture: ComponentFixture<MyOffersComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    let bookAdsServiceMock;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MyOffersComponent, EmptyContentMessageComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForRoot
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
            ]
        }).compileComponents();
        bookAdsServiceMock = TestBed.inject(BookAdsService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyOffersComponent);
        component = fixture.componentInstance;
        component.booksAdsTo = of(bookAdsMock);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'delete').mockReturnValue(of(null));
        component.deleteService(bookAdMock.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookAdMock.id);
    });

    it('should delete catch error', () => {
        const spy = jest.spyOn(bookAdsServiceMock, 'delete').mockReturnValue(throwError(errorMock));
        component.deleteService(bookAdMock.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(bookAdMock.id);
    });

    it('should verify error BAD003', () => {
        const spy = jest.spyOn(component, 'verifyErrorOffer');
        errorMock.error.message = 'BAD003';
        component.verifyErrorOffer(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });
});
