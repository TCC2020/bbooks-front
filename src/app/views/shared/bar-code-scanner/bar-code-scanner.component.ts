import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
enum BarcodeFormat {
    /** Aztec 2D barcode format. */
    AZTEC,

    /** CODABAR 1D format. */
    CODABAR,

    /** Code 39 1D format. */
    CODE_39,

    /** Code 93 1D format. */
    CODE_93,

    /** Code 128 1D format. */
    CODE_128,

    /** Data Matrix 2D barcode format. */
    DATA_MATRIX,

    /** EAN-8 1D format. */
    EAN_8,

    /** EAN-13 1D format. */
    EAN_13,

    /** ITF (Interleaved Two of Five) 1D format. */
    ITF,

    /** MaxiCode 2D barcode format. */
    MAXICODE,

    /** PDF417 format. */
    PDF_417,

    /** QR Code 2D barcode format. */
    QR_CODE,

    /** RSS 14 */
    RSS_14,

    /** RSS EXPANDED */
    RSS_EXPANDED,

    /** UPC-A 1D format. */
    UPC_A,

    /** UPC-E 1D format. */
    UPC_E,

    /** UPC/EAN extension format. Not a stand-alone format. */
    UPC_EAN_EXTENSION

}
export default BarcodeFormat;

@Component({
    selector: 'app-bar-code-scanner',
    templateUrl: './bar-code-scanner.component.html',
    styleUrls: ['./bar-code-scanner.component.scss']
})
export class BarCodeScannerComponent implements OnInit {
    formSearch: FormGroup;
    availableDevices: MediaDeviceInfo[];
    deviceCurrent: MediaDeviceInfo;
    deviceSelected: string;

    formatsEnabled: BarcodeFormat[] = [
        BarcodeFormat.CODE_128,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.EAN_13,
        BarcodeFormat.QR_CODE,
    ];

    hasDevices: boolean;
    hasPermission: boolean;

    qrResultString: string;

    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;

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


    clearResult(): void {
        this.qrResultString = null;
    }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCodeResult(resultString: string) {
        console.log('result');
        this.formSearch.get('search').setValue(resultString);
        this.qrResultString = resultString;
    }

    onDeviceSelectChange(selected: string) {
        const selectedStr = selected || '';
        if (this.deviceSelected === selectedStr) { return; }
        this.deviceSelected = selectedStr;
        const device = this.availableDevices.find(x => x.deviceId === selected);
        this.deviceCurrent = device || undefined;
    }

    onDeviceChange(device: MediaDeviceInfo) {
        const selectedStr = device?.deviceId || '';
        if (this.deviceSelected === selectedStr) { return; }
        this.deviceSelected = selectedStr;
        this.deviceCurrent = device || undefined;
    }

    onHasPermission(has: boolean) {
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }

    toggleTorch(): void {
        this.torchEnabled = !this.torchEnabled;
    }

    toggleTryHarder(): void {
        this.tryHarder = !this.tryHarder;
    }

}
