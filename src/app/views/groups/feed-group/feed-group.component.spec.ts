import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedGroupComponent} from './feed-group.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {userMock} from '../../../mocks/user.model.mock';
import {AuthService} from '../../../services/auth.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FeedGroupManagerService} from '../store/feed-group-manager.service';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {StoreModule} from '@ngrx/store';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('FeedGroupComponent', () => {
    let component: FeedGroupComponent;
    let fixture: ComponentFixture<FeedGroupComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [FeedGroupComponent],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                RouterTestingModule,
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
                FeedGroupManagerService,
                FeedService,
                PostService,
                FeedGenericService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
