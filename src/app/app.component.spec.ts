import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateServiceMockForRoot} from './mocks/translate.service.mock';
import {AuthService} from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {BnNgIdleService} from 'bn-ng-idle';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialAuthServiceConfigMock} from './mocks/google.provide.mock';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {userMock} from './mocks/user.model.mock';
import {of} from 'rxjs';
import {LoginComponent} from './modals/login/login.component';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {

    let fixture;
    let component;
    const authServiceMock = {
        getUser: jest.fn(() => userMock),
        logout: jest.fn( () => null)
    };

    const bnNgIdleServiceMock = {
        startWatching: jest.fn(() => of(true)),
        resetTimer: jest.fn( () => null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserDynamicTestingModule,
                SocialLoginModule,
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(
                    [{path: 'login', component: LoginComponent}]
                )
            ],
            declarations: [
                AppComponent,
                LoginComponent
            ],
            providers: [
                TranslateService,
                SocialAuthServiceConfigMock,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: BnNgIdleService,
                    useValue: bnNgIdleServiceMock
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be initialized', () => {
        expect(fixture).toBeTruthy();
    });

    it(`should have as title 'bbooks'`, () => {
        expect(component.title).toEqual('bbooks');
    });

});
