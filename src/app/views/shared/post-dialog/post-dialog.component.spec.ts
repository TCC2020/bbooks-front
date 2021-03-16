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
import {of, throwError} from 'rxjs';
import {userMock} from '../../../mocks/user.model.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {CUSTOM_ELEMENTS_SCHEMA, Injector} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {postMock} from '../../../mocks/post.model.mock';
import {PostService} from '../../../services/post.service';
import {TrackingService} from '../../../services/tracking.service';
import {UploadComponent} from '../../upload/upload.component';

describe('PostDialogComponent', () => {
    let component: PostDialogComponent;
    let fixture: ComponentFixture<PostDialogComponent>;
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    let postServiceMock: PostService;

    const matDialogRefMock = {
        close: jest.fn((response) => {
            return response;
        }),
        beforeClosed: jest.fn(() => of([]))
    };

    const menuChoose = Menu;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                FormsModule,
                MaterialModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForRoot,
                SweetAlert2Module
            ],
            declarations: [PostDialogComponent, UploadComponent],
            providers: [
                SocialAuthServiceConfigMock,
                SocialAuthService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                { provide: MatDialogRef, useValue: matDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: postMock },
                Injector
            ]
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [UploadComponent] } })
          .compileComponents();
        postServiceMock = TestBed.inject(PostService);
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
    });
    it('should chooseReview', () => {
        component.chooseReview();
        expect(component.textInput).toEqual('TEXT_POST_INPUT');
        expect(component.menuChoose).toEqual(menuChoose.REVIEW);
    });

    it('should resetAsks', () => {
        component.resetoptions();
        expect(component.textInput).toEqual('TEXT_POST_INPUT_ASK');
        expect(component.menuChoose).toEqual(menuChoose.ASK);
        expect(component.options.length).toEqual(2);
    });

    it('should get asks form', () => {
        expect(component.formFeed.get('survey').get('options')).toEqual(component.options);
    });

    it('should addAsk', () => {
        component.addAsk();
        component.addAsk();
        component.addAsk();
        expect(component.options.length).toEqual(3);
    });

    it('should removeAsk', () => {
        component.addAsk();
        component.removeAsk(0);
        expect(component.options.length).toEqual(0);
    });
    it('save: should save post', () => {
        component.dataDialog = null;
        const spyComponent = jest.spyOn(component, 'save');
        const spyPostServiceMock = jest.spyOn(postServiceMock, 'save').mockReturnValue(of(postMock));
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyPostServiceMock).toHaveBeenCalled();
    });

    it('save: should catch error post', () => {
        component.dataDialog = null;
        const spyComponent = jest.spyOn(component, 'save');
        const spyPostServiceMock = jest.spyOn(postServiceMock, 'save').mockReturnValue(throwError('error'));
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyPostServiceMock).toHaveBeenCalled();
    });

    it('save: should update post', () => {
        component.dataDialog = postMock;
        const spyComponent = jest.spyOn(component, 'save');
        const spyPostServiceMock = jest.spyOn(postServiceMock, 'update').mockReturnValue(of(postMock));
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyPostServiceMock).toHaveBeenCalled();
    });
    it('save: should catch error update post', () => {
        component.dataDialog = postMock;
        const spyComponent = jest.spyOn(component, 'save');
        const spyPostServiceMock = jest.spyOn(postServiceMock, 'update').mockReturnValue(throwError('error'));
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyPostServiceMock).toHaveBeenCalled();
    });

});

