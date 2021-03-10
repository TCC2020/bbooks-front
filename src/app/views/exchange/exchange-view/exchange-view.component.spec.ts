import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeViewComponent} from './exchange-view.component';
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
import {NgxQRCodeModule} from 'ngx-qrcode2';

describe('ExchangeViewComponent', () => {
    let component: ExchangeViewComponent;
    let fixture: ComponentFixture<ExchangeViewComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeViewComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForRoot,
                NgxQRCodeModule
            ],
            providers: [
                ExchangeService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
