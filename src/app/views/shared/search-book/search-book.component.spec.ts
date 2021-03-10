import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBookComponent} from './search-book.component';
import {BookService} from '../../../services/book.service';
import {SocialLoginModule} from 'angularx-social-login';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../empty-content-message/empty-content-message.component';

describe('SearchBookComponent', () => {
    let component: SearchBookComponent;
    let fixture: ComponentFixture<SearchBookComponent>;
    const mockMatDialog = {
        open: jest.fn(() => {
            return {
                afterClosed: jest.fn(() => of([]))
            };
        })
    };
    const matDialogRefMock = {
        close: jest.fn((response) => {
            return response;
        }),
        beforeClosed: jest.fn(() => of([]))
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [SearchBookComponent, EmptyContentMessageComponent ],
            imports: [
                SocialLoginModule,
                RouterTestingModule,
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForRoot,
                BrowserAnimationsModule
            ],
            providers : [
                BookService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
