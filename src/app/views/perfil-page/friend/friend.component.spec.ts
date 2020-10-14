import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendComponent} from './friend.component';
import {of} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForChild, TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialLoginModule} from 'angularx-social-login';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {UserService} from '../../../services/user.service';

describe('FriendComponent', () => {
    let component: FriendComponent;
    let fixture: ComponentFixture<FriendComponent>;
    const routeMock = {
        data: of({user: userMock})
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FriendComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
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
                TranslateStore,
                TranslateService,
                UserService,
                SocialAuthServiceConfigMock,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
