import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OfferViewComponent} from './offer-view.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('OfferViewComponent', () => {
    let component: OfferViewComponent;
    let fixture: ComponentFixture<OfferViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OfferViewComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OfferViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
