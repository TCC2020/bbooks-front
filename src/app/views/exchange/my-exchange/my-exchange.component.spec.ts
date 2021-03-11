import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyExchangeComponent} from './my-exchange.component';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookAdsService} from '../../../services/book-ads.service';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';

describe('MyExchangeComponent', () => {
    let component: MyExchangeComponent;
    let fixture: ComponentFixture<MyExchangeComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MyExchangeComponent, EmptyContentMessageComponent],
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
                BookAdsService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyExchangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
