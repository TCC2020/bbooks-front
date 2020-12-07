import {TestBed} from '@angular/core/testing';

import {AuthConfirmService} from './auth-confirm.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';

describe('AuthConfirmService', () => {
    let service: AuthConfirmService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
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
                }
            ]
        });
        service = TestBed.inject(AuthConfirmService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
