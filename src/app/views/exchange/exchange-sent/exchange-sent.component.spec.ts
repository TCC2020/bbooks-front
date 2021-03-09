import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeSentComponent} from './exchange-sent.component';
import {ExchangeService} from '../../../services/exchange.service';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {of, throwError} from 'rxjs';
import {bookAdMock} from '../../../mocks/book-ad.mock';
import {exchangeMock, exchangesMock} from '../../../mocks/exchange.mock';
import {errorMock} from '../../../mocks/error.model.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';

describe('ExchangeSentComponent', () => {
    let component: ExchangeSentComponent;
    let fixture: ComponentFixture<ExchangeSentComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    let exchangeServiceMock: ExchangeService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ExchangeSentComponent, EmptyContentMessageComponent],
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
                ExchangeService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
            ]
        }).compileComponents();
        exchangeServiceMock = TestBed.inject(ExchangeService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeSentComponent);
        component = fixture.componentInstance;
        component.exchanges$ = of(exchangesMock);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should cancel exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'cancel').mockReturnValue(of(exchangeMock));
        component.cancel('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should catch error cancel exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'cancel').mockReturnValue(throwError(errorMock));
        component.cancel('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });
});
