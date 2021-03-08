import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainSearchComponent} from './main-search.component';
import {MaterialModule} from '../../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('MainSearchComponent', () => {
    let component: MainSearchComponent;
    let fixture: ComponentFixture<MainSearchComponent>;
    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainSearchComponent],
            imports: [
                MaterialModule,
                ReactiveFormsModule,
                TranslateServiceMockForChild,
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserDynamicTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
