import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostCreateComponent} from './post-create.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../shared.module';
import {ActivatedRoute} from '@angular/router';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialAuthService} from 'angularx-social-login';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {PostService} from '../../../services/post.service';
import {FeedService} from '../../../services/feed.service';
import {of} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {StoreModule} from '@ngrx/store';

describe('PostCreateComponent', () => {
    let component: PostCreateComponent;
    let fixture: ComponentFixture<PostCreateComponent>;
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostCreateComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
                BrowserDynamicTestingModule,
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

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostCreateComponent);
        component = fixture.componentInstance;
        component.user = userMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should openPost', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openPost();
        expect(spy).toHaveBeenCalled();
    });
});
