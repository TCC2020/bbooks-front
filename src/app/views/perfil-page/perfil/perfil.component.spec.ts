import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {SocialLoginModule} from 'angularx-social-login';
import {MaterialModule} from 'src/app/material/material.module';
import {SocialAuthServiceConfigMock} from 'src/app/mocks/google.provide.mock';
import {TranslateServiceMockForChild, TranslateServiceMockForRoot} from 'src/app/mocks/translate.service.mock';
import {AuthService} from 'src/app/services/auth.service';
import {ConsultaCepService} from 'src/app/services/consulta-cep.service';
import {ProfileService} from 'src/app/services/profile.service';

import {PerfilComponent} from './perfil.component';
import {of} from 'rxjs';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';

describe('PerfilComponent', () => {
    let component: PerfilComponent;
    let fixture: ComponentFixture<PerfilComponent>;
    const userMock = {
        profile: {
            id: 10
        }
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PerfilComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                SocialLoginModule,
                TranslateServiceMockForRoot,
                TranslateServiceMockForChild
            ],
            providers: [
                FormBuilder,
                ConsultaCepService,
                ProfileService,
                SocialAuthServiceConfigMock,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                TranslateService,
                TranslateStore,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PerfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
