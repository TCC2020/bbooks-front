import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAdministratorComponent} from './add-administrator.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AddAdministratorComponent', () => {
    let component: AddAdministratorComponent;
    let fixture: ComponentFixture<AddAdministratorComponent>;
    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddAdministratorComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                TranslateModule,
                MaterialModule,
                RouterModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                TranslateModule,
                TranslateServiceMockForChild,
                BrowserAnimationsModule
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock
            ]
        }).compileComponents();
        service = TestBed.inject(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddAdministratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
