import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactionsComponent} from './reactions.component';
import {MaterialModule} from '../../../material/material.module';
import {of} from 'rxjs';
import {postMock} from '../../../mocks/post.model.mock';
import {PostService} from '../../../services/post.service';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ActivatedRoute} from '@angular/router';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialAuthService} from 'angularx-social-login';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {userMock} from '../../../mocks/user.model.mock';

describe('ReactionsComponent', () => {
    let component: ReactionsComponent;
    let fixture: ComponentFixture<ReactionsComponent>;
    let postServiceMock: PostService;

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReactionsComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
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
                PostService
            ]
        })
            .compileComponents();
        postServiceMock = TestBed.inject(PostService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReactionsComponent);
        component = fixture.componentInstance;
        component.user = userMock;
        component.post = postMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('delete: should delete', () => {
        const spyComponent = jest.spyOn(component, 'delete');
        const spyServicePost = jest.spyOn(postServiceMock, 'delete').mockReturnValue(of(null));
        component.delete(postMock);
        expect(spyComponent).toHaveBeenCalled();
        expect(spyServicePost).toHaveBeenCalled();
    });
});
