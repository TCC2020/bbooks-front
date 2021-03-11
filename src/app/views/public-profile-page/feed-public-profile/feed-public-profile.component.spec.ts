import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedPublicProfileComponent} from './feed-public-profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {of} from 'rxjs';
import {publicProfileMock} from '../../../mocks/public-profile.mock';
import {ActivatedRoute} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FeedPublicProfileComponent', () => {
    let component: FeedPublicProfileComponent;
    let fixture: ComponentFixture<FeedPublicProfileComponent>;
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
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [FeedPublicProfileComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientTestingModule,
                TranslateModule,
                TranslateServiceMockForChild,
                InfiniteScrollModule,
                StoreModule.forRoot({}),
                BrowserDynamicTestingModule
            ],
            providers: [
                TranslateService,
                TranslateStore,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedPublicProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
