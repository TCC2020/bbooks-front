import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth-guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../services/auth.service";
import {AuthorService} from "../services/author.service";

describe('GuardsComponent', () => {
    let service: AuthGuard;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SocialLoginModule,
                RouterTestingModule
            ],
            providers: [
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
        service = TestBed.inject(AuthGuard);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });
});
