import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MembersGroupComponent} from './members-group.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GroupMemberService} from '../../../services/group-member.service';
import {UserService} from '../../../services/user.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {of, throwError} from 'rxjs';
import {groupMock} from '../../../mocks/group.mock';
import {ActivatedRoute} from '@angular/router';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {GroupService} from '../../../services/group.service';
import {groupMembersListMock, groupMembersMock} from '../../../mocks/group-members.mock';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';

describe('MembersGroupComponent', () => {
    let component: MembersGroupComponent;
    let fixture: ComponentFixture<MembersGroupComponent>;
    const routeMock = {
        snapshot: {},
        parent: new MockActivatedRoute({
            params: {id: 'teste'}
        }),
        data: of({groupTo: groupMock})
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    let groupMembersServiceMock: GroupMemberService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MembersGroupComponent],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForChild,
                BrowserDynamicTestingModule,
                SocialLoginModule
            ],
            providers: [
                TranslateService,
                TranslateStore,
                GroupMemberService,
                UserService,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock
            ]
        }).compileComponents();
        groupMembersServiceMock = TestBed.inject(GroupMemberService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MembersGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create member-group component', () => {
        expect(component).toBeTruthy();
    });

    it('should get members', () => {
        const spy = jest.spyOn(groupMembersServiceMock, 'getGroupMembers').mockReturnValue(of(groupMembersListMock));
        component.getMembers();
        expect(component).toBeTruthy();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.groupTO.id);
    });

    it('should catch error get members', () => {
        const spy = jest.spyOn(groupMembersServiceMock, 'getGroupMembers').mockReturnValue(throwError('error'));
        component.getMembers();
        expect(component).toBeTruthy();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.groupTO.id);
    });
});
