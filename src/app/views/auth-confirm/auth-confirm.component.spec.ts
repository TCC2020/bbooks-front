import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthConfirmComponent} from './auth-confirm.component';
import {MaterialModule} from "../../material/material.module";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {AuthService} from "../../services/auth.service";
import {AuthConfirmService} from "../../services/auth-confirm.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthConfirmComponent', () => {
    let component: AuthConfirmComponent;
    let fixture: ComponentFixture<AuthConfirmComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [AuthConfirmComponent],
            providers: [
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: GoogleLoginProvider.PROVIDER_ID,
                                provider: new GoogleLoginProvider(
                                    '637875920121-2l5ibvruevm5ldf5gdc78erdno23pd2b.apps.googleusercontent.com'
                                ),
                            }
                        ],
                    } as SocialAuthServiceConfig
                },
                AuthService,
                FormBuilder,
                AuthConfirmService
            ],
            imports: [
                MaterialModule,
                FormsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                SocialLoginModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
