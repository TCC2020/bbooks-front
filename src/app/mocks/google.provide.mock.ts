import {GoogleLoginProvider, SocialAuthServiceConfig} from "angularx-social-login";

export const SocialAuthServiceConfigMock = {
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
