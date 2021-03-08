import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicProfileComponent} from './public-profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';

describe('PublicProfileComponent', () => {
    let component: PublicProfileComponent;
    let fixture: ComponentFixture<PublicProfileComponent>;

    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PublicProfileComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientModule,
                TranslateModule,
                TranslateServiceMockForChild
            ],
            providers: [
                TranslateService,
                TranslateStore,
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
        fixture = TestBed.createComponent(PublicProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
