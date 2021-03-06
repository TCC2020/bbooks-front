import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagDialogComponent} from './tag-dialog.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {AuthService} from '../../../services/auth.service';
import {TagService} from '../../../services/tag.service';
import {SocialLoginModule} from 'angularx-social-login';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {tagMock} from '../../../mocks/tag.model.mock';
import {userMock} from '../../../mocks/user.model.mock';

describe('TagDialogComponent', () => {
    let component: TagDialogComponent;
    let fixture: ComponentFixture<TagDialogComponent>;
    let tagServiceMock: TagService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };
    const matDialogRefMock = {
        close: jest.fn((response) => {
            return response;
        })
    };

    const tagMockData = {
        id: 1010,
        name: 'teste Tag',
        color: 'white',
        profile: null,
        books: []
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagDialogComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MaterialModule,
                CarouselModule,
                SocialLoginModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateServiceMockForChild
            ],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                TagService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: tagMockData
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
                TranslateService,
                TranslateStore
            ]
        }).compileComponents();
        tagServiceMock = TestBed.inject(TagService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('test on mod create tag', () => {
        component.tag = null;
        component.ngOnInit();
        expect(component.textForm).toEqual('PADRAO.CRIAR');
    });
    it('test on mod edit tag', () => {
        expect(component.textForm).toEqual('PADRAO.EDITAR');
    });
    it('form invalid when input tag is empty', () => {
        component.tag = null;
        component.ngOnInit();
        const tagInput = component.formTag.controls.name;
        expect(tagInput.errors.required).toBeTruthy();
        expect(component.formTag.invalid).toBeTruthy();
    });

    it('form valid when it has text in input tag ', () => {
        expect(component.formTag.valid).toBeTruthy();
    });

    it('should call save tag', () => {
        component.tag = null;
        const spy = jest.spyOn(tagServiceMock, 'save').mockReturnValue(of(tagMock));
        component.save();
        expect(spy).toHaveBeenCalled();
    });

    it('should call update tag', () => {
        component.tag = tagMockData;
        const spy = jest.spyOn(tagServiceMock, 'update').mockReturnValue(of(tagMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.tag);

    });
});
