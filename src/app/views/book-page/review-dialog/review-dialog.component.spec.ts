import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewDialogComponent} from './review-dialog.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {SocialLoginModule} from 'angularx-social-login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TagService} from '../../../services/tag.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth.service';
import {UserbookService} from '../../../services/userbook.service';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {ProfileService} from '../../../services/profile.service';
import {of} from 'rxjs';
import {bookMock} from '../../../mocks/book.model.mock';
import {reviewMock} from '../../../mocks/review.model.mock';

describe('ReviewDialogComponent', () => {
    let component: ReviewDialogComponent;
    let fixture: ComponentFixture<ReviewDialogComponent>;

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
    const data = {
        review: reviewMock,
        book: bookMock
    };

    const userMock = {
        profile: {
            id: 10
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
                TranslateServiceMockForChild,
                BrowserDynamicTestingModule
            ],
            providers: [
                TagService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: data
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
                TranslateService,
                TranslateStore,
                ProfileService
            ],
            declarations: [ReviewDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
