import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePublicProfileComponent} from './create-public-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CreatePublicProfileComponent', () => {
    let component: CreatePublicProfileComponent;
    let fixture: ComponentFixture<CreatePublicProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreatePublicProfileComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                TranslateModule,
                MaterialModule,
                RouterModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                BrowserAnimationsModule
            ],
            providers: [
                TranslateService,
                TranslateStore
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatePublicProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
