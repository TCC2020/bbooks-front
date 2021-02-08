import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateGroupComponent} from './create-group.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialLoginModule} from 'angularx-social-login';
import {userMock} from '../../../mocks/user.model.mock';

describe('CreateGroupComponent', () => {
    let component: CreateGroupComponent;
    let fixture: ComponentFixture<CreateGroupComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateGroupComponent],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                TranslateServiceMockForChild,
                SocialLoginModule
            ],
            providers: [
                AuthService,
                TranslateStore,
                TranslateService,
                SocialAuthServiceConfigMock,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
