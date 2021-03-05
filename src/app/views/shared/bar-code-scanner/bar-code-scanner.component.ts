import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-bar-code-scanner',
    templateUrl: './bar-code-scanner.component.html',
    styleUrls: ['./bar-code-scanner.component.scss']
})
export class BarCodeScannerComponent implements OnInit, AfterViewInit {
    formSearch: FormGroup;

    @ViewChild(BarcodeScannerLivestreamComponent)
    barcodeScanner: BarcodeScannerLivestreamComponent;

    barcodeValue;

    constructor(
        private fb: FormBuilder
    ) {
    }
    ngOnInit(): void {
        this.formSearch = this.fb.group({
            search: new FormControl('', Validators.required)
        });
    }


    ngAfterViewInit() {
        this.barcodeScanner.start();
    }

    onValueChanges(result) {
        this.barcodeValue = result.codeResult.code;
        this.formSearch.get('search').setValue(this.barcodeValue);
    }

    onStarted(started) {
        console.log(started);
    }

}
