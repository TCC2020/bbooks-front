import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostDialogComponent} from './post-dialog.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialAuthService} from 'angularx-social-login';
import {of} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PostDialogComponent', () => {
    let component: PostDialogComponent;
    let fixture: ComponentFixture<PostDialogComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                FormsModule,
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
            ],
            declarations: [PostDialogComponent],
            providers: [
                SocialAuthServiceConfigMock,
                SocialAuthService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
