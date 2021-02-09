import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YourGroupComponent} from './your-group.component';
import {MaterialModule} from '../../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('YourGroupComponent', () => {
    let component: YourGroupComponent;
    let fixture: ComponentFixture<YourGroupComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YourGroupComponent],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                TranslateServiceMockForChild,
                SocialLoginModule
            ],
            providers: [
                SocialAuthServiceConfigMock,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                TranslateService,
                TranslateStore,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
