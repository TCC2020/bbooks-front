import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {AuthService} from '../../services/auth.service';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForRoot} from '../../mocks/translate.service.mock';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SocialLoginModule,
                RouterTestingModule,
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForRoot
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
            ],
            declarations: [NavBarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
