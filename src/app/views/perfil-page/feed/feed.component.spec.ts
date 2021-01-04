import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedComponent} from './feed.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialAuthService} from 'angularx-social-login';
import {AuthService} from '../../../services/auth.service';

describe('FeedComponent', () => {
    let component: FeedComponent;
    let fixture: ComponentFixture<FeedComponent>;
    const routeMock = {
        data: of({user: userMock})
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FeedComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                SocialAuthServiceConfigMock,
                SocialAuthService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
