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
import {MatDialog} from '@angular/material/dialog';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PostService} from '../../../services/post.service';
import {postMock, postPagination, postsMock} from '../../../mocks/post.model.mock';
import {FeedService} from '../../../services/feed.service';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {reducer} from '../store/reducers/feed.reducer';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('FeedComponent', () => {
    let component: FeedComponent;
    let fixture: ComponentFixture<FeedComponent>;
    const routeMock = {
        data: of({user: userMock})
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };

    let postServiceMock: PostService;
    let feedServiceMock: FeedService;

    global  = Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [FeedComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
                FlexLayoutModule,
                FlexLayoutModule,
                SharedModule,
                StoreModule.forRoot({}),
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
                },
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                PostService,
                FeedService
            ]
        }).compileComponents();
        postServiceMock = TestBed.inject(PostService);
        feedServiceMock = TestBed.inject(FeedService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component.ngOnInit();
        expect(component).toBeTruthy();
    });


    it('should call onScroll', () => {
        const spyComponent = jest.spyOn(component, 'onScroll');
        component.onScroll();
        expect(spyComponent).toHaveBeenCalled();
    });

    it('getPosts: should getByProfileId', () => {
        const spyComponent = jest.spyOn(component, 'getPosts');
        component.user.id = 'userMock';

        const spyServicePost = jest.spyOn(postServiceMock, 'getByProfileId').mockReturnValue(of(postPagination));
        component.getPosts();
        expect(true).toBeTruthy();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyServicePost).toHaveBeenCalled();
    });
});

