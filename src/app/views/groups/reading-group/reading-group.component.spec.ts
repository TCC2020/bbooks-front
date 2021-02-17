import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from 'src/app/material/material.module';
import {TranslateServiceMockForChild} from 'src/app/mocks/translate.service.mock';

import {ReadingGroupComponent} from './reading-group.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {of, throwError} from 'rxjs';
import {groupMock} from '../../../mocks/group.mock';
import {GroupMemberService} from '../../../services/group-member.service';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {GroupMembers, Id} from '../../../models/GroupMembers.model';
import {groupMembersMock} from '../../../mocks/group-members.mock';
import {Role} from '../../../models/enums/Role.enum';

describe('ReadingGroupComponent', () => {
    let component: ReadingGroupComponent;
    let fixture: ComponentFixture<ReadingGroupComponent>;
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
    let groupMemberServiceMock: GroupMemberService;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReadingGroupComponent],
            imports: [
                MaterialModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                TranslateService,
                TranslateStore,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                SocialAuthServiceConfigMock,
                GroupMemberService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        groupMemberServiceMock = TestBed.inject(GroupMemberService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadingGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should enter group create', () => {
        const member = new GroupMembers();
        member.userId = authServiceMock.getUser().id;
        member.groupId = component.groupTO.id;

        member.role = Role.member;
        const spy = jest.spyOn(groupMemberServiceMock, 'enterGroup').mockReturnValue(of(null));

        component.enterGroup();
        expect(component).toBeTruthy();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(member);
    });

    it('should enter group create', () => {
        const member = new GroupMembers();
        member.userId = authServiceMock.getUser().id;
        member.groupId = component.groupTO.id;

        member.role = Role.member;
        const spy = jest.spyOn(groupMemberServiceMock, 'enterGroup').mockReturnValue(throwError(`error`));

        component.enterGroup();
        expect(component).toBeTruthy();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(member);
    });

});
