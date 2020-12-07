import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialLoginModule} from 'angularx-social-login';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {Observable, of} from 'rxjs';
import {bookcaseMock} from '../../../mocks/bookcase.model.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import { TranslateService, TranslateStore} from '@ngx-translate/core';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {MainResolve} from '../guards/main.resolve';

describe('MainPageComponent', () => {
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;
    const routeMock = {
        snapshot:  {},
        parent: new MockActivatedRoute({
            params: { username: 'teste' }
        }),
        data: of({user: userMock})
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainPageComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForChild,
                SocialLoginModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                AuthService,
                SocialAuthServiceConfigMock,
                TranslateStore,
                TranslateService,
                MainResolve
            ],

        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
