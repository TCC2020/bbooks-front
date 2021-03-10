import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListLiteraryCompetitionComponent} from './list-literary-competition.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';

describe('ListLiteraryCompetitionComponent', () => {
    let component: ListLiteraryCompetitionComponent;
    let fixture: ComponentFixture<ListLiteraryCompetitionComponent>;
    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [ListLiteraryCompetitionComponent, EmptyContentMessageComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
                HttpClientTestingModule,
                TranslateModule,
                TranslateServiceMockForChild
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock
            ]
        }).compileComponents();
        service = TestBed.inject(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListLiteraryCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
