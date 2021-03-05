import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarCodeScannerComponent} from './bar-code-scanner.component';
import {BarcodeScannerLivestreamModule} from 'ngx-barcode-scanner';
import {ReactiveFormsModule} from '@angular/forms';

describe('BarCodeScannerComponent', () => {
    let component: BarCodeScannerComponent;
    let fixture: ComponentFixture<BarCodeScannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BarCodeScannerComponent],
            imports: [
                BarcodeScannerLivestreamModule,
                ReactiveFormsModule
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
