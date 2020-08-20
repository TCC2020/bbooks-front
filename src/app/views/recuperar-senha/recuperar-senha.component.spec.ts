import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecuperarSenhaComponent} from './recuperar-senha.component';
import {FormBuilder, FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MaterialModule} from "../../material/material.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {
    GoogleLoginProvider,
    SocialAuthService,
    SocialAuthServiceConfig,
    SocialLoginModule
} from "angularx-social-login";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('RecuperarSenhaComponent', () => {
    let component: RecuperarSenhaComponent;
    let fixture: ComponentFixture<RecuperarSenhaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            declarations: [RecuperarSenhaComponent],
            providers: [
                FormBuilder,
                AuthService,
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
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecuperarSenhaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
