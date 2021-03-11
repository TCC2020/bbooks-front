import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeLineComponent} from './time-line.component';
import {MglTimelineModule} from 'angular-mgl-timeline';
import {MaterialModule} from '../../material/material.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateServiceMockForChild} from '../../mocks/translate.service.mock';
import {EmptyContentMessageComponent} from '../shared/empty-content-message/empty-content-message.component';
import {userMock} from '../../mocks/user.model.mock';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {AuthService} from '../../services/auth.service';
import {BookService} from '../../services/book.service';
import {GoogleBooksService} from '../../services/google-books.service';
import {UserbookService} from '../../services/userbook.service';
import {SocialAuthServiceConfigMock} from '../../mocks/google.provide.mock';
import {SocialAuthService, SocialLoginModule} from 'angularx-social-login';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TimeLineComponent', () => {
    let component: TimeLineComponent;
    let fixture: ComponentFixture<TimeLineComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [TimeLineComponent, EmptyContentMessageComponent, TimeLineComponent],
            imports: [
                MglTimelineModule,
                MaterialModule,
                TranslateServiceMockForChild,
                BrowserDynamicTestingModule,
                SocialLoginModule,
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                BookService,
                GoogleBooksService,
                UserbookService,
                SocialAuthServiceConfigMock,
                SocialAuthService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
