import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutPublicProfileComponent} from './about-public-profile.component';
import {ActivatedRoute, convertToParamMap, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {groupMock} from '../../../mocks/group.mock';
import {publicProfileMock} from '../../../mocks/public-profile.mock';
import {PublicProfileService} from '../../../services/public-profile.service';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';

describe('AboutPublicProfileComponent', () => {
    let component: AboutPublicProfileComponent;
    let fixture: ComponentFixture<AboutPublicProfileComponent>;

    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    const routeMock = {
        snapshot: {},
        parent: new MockActivatedRoute({
            params: of({id: '337a3e65-5fee-458c-a18e-79458c5355a5'})
        }),
        data: of({publicProfileTo: publicProfileMock})
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutPublicProfileComponent],
            imports: [
                RouterModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule,
                TranslateModule,
                TranslateServiceMockForChild
            ],
            providers: [
                TranslateService,
                TranslateStore,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock,
                PublicProfileService
            ]
        })
            .compileComponents();
        service = TestBed.inject(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutPublicProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
