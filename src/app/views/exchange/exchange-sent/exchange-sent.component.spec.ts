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

describe('ExchangeSentComponent', () => {
    let component: ExchangeSentComponent;
    let fixture: ComponentFixture<ExchangeSentComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeSentComponent],
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeSentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
