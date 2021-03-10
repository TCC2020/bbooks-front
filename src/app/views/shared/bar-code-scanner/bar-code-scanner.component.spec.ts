import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarCodeScannerComponent} from './bar-code-scanner.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

describe('BarCodeScannerComponent', () => {
    let component: BarCodeScannerComponent;
    let fixture: ComponentFixture<BarCodeScannerComponent>;
    const data = {
        isExchange: false
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BarCodeScannerComponent],
            imports: [
                ReactiveFormsModule,
                MaterialModule,
                TranslateServiceMockForChild,
                HttpClientTestingModule,
                ZXingScannerModule
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: data
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarCodeScannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
