import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainGroupComponent} from './main-group.component';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('MainGroupComponent', () => {
    let component: MainGroupComponent;
    let fixture: ComponentFixture<MainGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainGroupComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserDynamicTestingModule,
                TranslateServiceMockForChild,
                HttpClientTestingModule
            ],
            providers: [
                TranslateStore,
                TranslateService,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
