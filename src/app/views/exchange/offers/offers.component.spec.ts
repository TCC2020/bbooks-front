import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OffersComponent} from './offers.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookAdsService} from '../../../services/book-ads.service';
import {TranslateServiceMockForRoot} from '../../../mocks/translate.service.mock';
import {FilterAsyncPipe} from '../pipes/filter-async.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';

describe('OffersComponent', () => {
    let component: OffersComponent;
    let fixture: ComponentFixture<OffersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [OffersComponent, FilterAsyncPipe,
                EmptyContentMessageComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TranslateServiceMockForRoot
            ],
            providers: [
                BookAdsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OffersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
