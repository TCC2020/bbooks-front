import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Menu, PostDialogComponent} from './post-dialog.component';
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
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';

describe('PostDialogComponent', () => {
    let component: PostDialogComponent;
    let fixture: ComponentFixture<PostDialogComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    const menuChoose = Menu;

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
                TranslateServiceMockForRoot
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
    it('should choosePhoto', () => {
        component.choosePhoto();
        expect(component.textInput).toEqual('TEXT_POST_INPUT');
        expect(component.menuChoose).toEqual(menuChoose.PHOTO);
    });
    it('should chooseReview', () => {
        component.chooseReview();
        expect(component.textInput).toEqual('TEXT_POST_INPUT');
        expect(component.menuChoose).toEqual(menuChoose.REVIEW);
    });

    it('should resetAsks', () => {
        component.resetAsks();
        expect(component.textInput).toEqual('TEXT_POST_INPUT_ASK');
        expect(component.menuChoose).toEqual(menuChoose.ASK);
        expect(component.asks.length).toEqual(2);
    });

    it('should get asks form', () => {
        expect(component.formFeed.get('asks')).toEqual(component.asks);
    });

    it('should addAsk', () => {
        component.addAsk();
        component.addAsk();
        component.addAsk();
        expect(component.asks.length).toEqual(3);
    });

    it('should removeAsk', () => {
        component.addAsk();
        component.removeAsk(0);
        expect(component.asks.length).toEqual(0);
    });
});

