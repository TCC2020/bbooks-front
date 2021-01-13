import { FriendsService } from './../../../services/friends.service';
import { AuthService } from './../../../services/auth.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendComponent} from './friend.component';
import {of, throwError} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForChild, TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialLoginModule} from 'angularx-social-login';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {UserService} from '../../../services/user.service';
import { profile } from 'console';
import { friendMock } from 'src/app/mocks/friend.model.mock';

describe('FriendComponent', () => {
    let component: FriendComponent;
    let fixture: ComponentFixture<FriendComponent>;
    let httpFriendsService: FriendsService;

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
            httpFriendsService = TestBed.inject(FriendsService);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deleteFriend: should delete',  done => {
        component.user = userMock;
        const spy = jest.spyOn(httpFriendsService, 'deleteFriend').mockReturnValue(of(friendMock));
        component.deleteFriend(userMock.profile.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id);
        done();
    });

    it('deleteFriend: should delete error',  done => {
        component.user = userMock;
        const spy = jest.spyOn(httpFriendsService, 'deleteFriend').mockReturnValue(throwError('error'));
        component.deleteFriend(userMock.profile.id);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(userMock.profile.id);
        done();
    });

    /*it('verfiyPerfilPageisUserLogged: should be true',  () => {
        component.user.id = userMock.id;
        expect(component.verfiyPerfilPageisUserLogged()).toBeTruthy();
    });*/

    it('verfiyPerfilPageisUserLogged: should be false',  () => {
        expect(component.verfiyPerfilPageisUserLogged()).toBeFalsy();
    });
});
