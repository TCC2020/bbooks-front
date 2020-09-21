import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookMenuComponent} from './book-menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookService} from '../../../services/book.service';
import {TagService} from '../../../services/tag.service';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {of} from 'rxjs';
import {tagsMock} from '../../../mocks/tag.model.mock';
import {MatDialog} from '@angular/material/dialog';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';

describe('BookMenuComponent', () => {
    let component: BookMenuComponent;
    let fixture: ComponentFixture<BookMenuComponent>;
    const userMock = {
        profile: {
            id: 10
        }
    };
    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };
    const tagServiceMock = {
        getAllByProfile: jest.fn( () => of(tagsMock)),
        delete: jest.fn( () => of(null))
    };
    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                HttpClientTestingModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                MaterialModule,
                RouterTestingModule,
                TranslateServiceMockForChild
            ],
            providers: [
                GoogleBooksService,
                BookService,
                TagService,
                AuthService,
                SocialAuthServiceConfigMock,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: TagService,
                    useValue: tagServiceMock
                },
                {
                    provide: MatDialog, useValue: mockMatDialog
                },
            ],
            declarations: [BookMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('tags in component', () => {
        expect(component.tags).toEqual(tagsMock);
    });

    it('verify open Dialog tag', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogTag(component.tags[0]);
        expect(spy).toHaveBeenCalled();
    });

    it('delete tag', () => {
        const spy = jest.spyOn(tagServiceMock, 'delete');
        component.deleteTag(0);
        expect(spy).toHaveBeenCalled();
    });
});
