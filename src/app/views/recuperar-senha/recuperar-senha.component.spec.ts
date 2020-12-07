import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecuperarSenhaComponent} from './recuperar-senha.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MaterialModule} from '../../material/material.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
    GoogleLoginProvider,
    SocialAuthServiceConfig,
    SocialLoginModule
} from 'angularx-social-login';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {SocialAuthServiceConfigMock} from '../../mocks/google.provide.mock';

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
                NoopAnimationsModule,
                ReactiveFormsModule,
                TranslateServiceMockForRoot
            ],
            declarations: [RecuperarSenhaComponent],
            providers: [
                FormBuilder,
                AuthService,
                SocialAuthServiceConfigMock,
                TranslateService,
                TranslateStore
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
