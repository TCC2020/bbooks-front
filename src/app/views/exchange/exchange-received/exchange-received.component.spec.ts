import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeReceivedComponent} from './exchange-received.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {ExchangeService} from '../../../services/exchange.service';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {of, throwError} from 'rxjs';
import {exchangeMock, exchangesMock} from '../../../mocks/exchange.mock';
import {errorMock} from '../../../mocks/error.model.mock';

describe('ExchangeReceivedComponent', () => {
    let component: ExchangeReceivedComponent;
    let fixture: ComponentFixture<ExchangeReceivedComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    let exchangeServiceMock: ExchangeService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeReceivedComponent],
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
        fixture = TestBed.createComponent(ExchangeReceivedComponent);
        component = fixture.componentInstance;
        component.exchanges$ = of(exchangesMock);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'accept').mockReturnValue(of(exchangeMock));
        component.accept('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should catch error accept exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'accept').mockReturnValue(throwError(errorMock));
        component.accept('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should refuse exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'refuse').mockReturnValue(of(exchangeMock));
        component.refuse('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });

    it('should catch error refuse exchange', () => {
        const spy = jest.spyOn(exchangeServiceMock, 'refuse').mockReturnValue(throwError(errorMock));
        component.refuse('101101');
        expect(spy).toHaveBeenCalled();
        expect(component).toBeTruthy();
    });
});
