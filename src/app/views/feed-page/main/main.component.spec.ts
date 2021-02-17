import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {AuthService} from '../../../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialAuthService} from 'angularx-social-login';
import {userMock} from '../../../mocks/user.model.mock';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared/shared.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [MainComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
                StoreModule.forRoot({}),
                SharedModule,
                BrowserDynamicTestingModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock,
                SocialAuthService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        component.user = userMock;
        component.typePostControler = TypePostControler;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
