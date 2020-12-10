import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookcaseComponent} from './bookcase.component';
import {BehaviorSubject, of} from 'rxjs';
import {bookcaseMock} from '../../../mocks/bookcase.model.mock';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocialLoginModule} from 'angularx-social-login';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {BookService} from '../../../services/book.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {ActivatedRoute} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('BookcaseComponent', () => {
    let component: BookcaseComponent;
    let fixture: ComponentFixture<BookcaseComponent>;
    const routeMock = {
        data: of({bookcase: bookcaseMock})
    };
    const mediaChange = new MediaChange();
    mediaChange.mqAlias = 'xs';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [BookcaseComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                SocialLoginModule,
                TranslateServiceMockForChild
            ],
            providers: [
                BookService,
                SocialAuthServiceConfigMock,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
                {
                    provide: MediaObserver,
                    useValue: {asObservable: jest.fn(() =>  of([mediaChange]))}
                },
                TranslateService,
                TranslateStore
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
