import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksSearchComponent} from './books-search.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';

describe('BooksSearchComponent', () => {
    let component: BooksSearchComponent;
    let fixture: ComponentFixture<BooksSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                MaterialModule,
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                HttpClientTestingModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                RouterTestingModule,
                TranslateServiceMockForRoot
            ],
            providers: [
                SocialAuthServiceConfigMock
            ],
            declarations: [BooksSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BooksSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
