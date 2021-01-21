import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyOffersComponent} from './my-offers.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MyOffersComponent', () => {
    let component: MyOffersComponent;
    let fixture: ComponentFixture<MyOffersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyOffersComponent],
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
        fixture = TestBed.createComponent(MyOffersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
