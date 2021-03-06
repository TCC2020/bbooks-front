import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateStoryComponent} from './create-story.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CreateStoryComponent', () => {
    let component: CreateStoryComponent;
    let fixture: ComponentFixture<CreateStoryComponent>;
    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateStoryComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                TranslateModule,
                RouterModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
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
        })
            .compileComponents();
        service = TestBed.inject(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
