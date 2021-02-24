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

describe('ExchangeReceivedComponent', () => {
    let component: ExchangeReceivedComponent;
    let fixture: ComponentFixture<ExchangeReceivedComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeReceivedComponent], imports: [
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
        fixture = TestBed.createComponent(ExchangeReceivedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
