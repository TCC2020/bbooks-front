import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReviewDialogComponent} from './review-dialog.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
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
import {ReviewTO} from '../../../models/ReviewTO.model';
import {ReviewService} from '../../../services/review.service';

describe('ReviewDialogComponent', () => {
    let component: ReviewDialogComponent;
    let fixture: ComponentFixture<ReviewDialogComponent>;
    let reviewService: ReviewService;

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
        reviewService = TestBed.inject(ReviewService);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should inject Data dialog', () => {
        expect(component.data).toEqual(data);
    });

    it('form invalid when input tittle is empty', () => {
        component.data.review.title = null;
        component.ngOnInit();
        const newLocal = 'title';
        const tagInput = component.formReview.controls[newLocal];
        expect(tagInput.errors.required).toBeTruthy();
        expect(component.formReview.invalid).toBeTruthy();
    });

    it('form invalid when input body is empty', () => {
        component.data.review.body = null;
        component.ngOnInit();
        const newLocal = 'body';
        const tagInput = component.formReview.controls[newLocal];
        expect(tagInput.errors.required).toBeTruthy();
        expect(component.formReview.invalid).toBeTruthy();
    });

    it('should call save and and call reviewService save method ', () => {
        component.data.review = new ReviewTO();
        component.ngOnInit();
        const spyComponent = jest.spyOn(component, 'save');
        const spyReviewService = jest.spyOn(reviewService, 'save').mockReturnValue(of(reviewMock));
        component.formReview.get('title').setValue('Maravilhoso');
        component.formReview.get('body').setValue('Um livro  historico');
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyReviewService).toHaveBeenCalled();
    });

    it('should call save and and call reviewService  update method', () => {
        const spyComponent = jest.spyOn(component, 'save');
        const spyReviewService = jest.spyOn(reviewService, 'update').mockReturnValue(of(reviewMock));

        component.formReview.get('title').setValue('Maravilhoso');
        component.formReview.get('body').setValue('Um livro  historico');
        component.save();
        expect(spyComponent).toHaveBeenCalled();
        expect(spyReviewService).toHaveBeenCalled();
    });
});
