import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {BarcodeFormat} from '@zxing/library';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.CODE_128,
        BarcodeFormat.QR_CODE,
        // BarcodeFormat.AZTEC,
        // BarcodeFormat.CODABAR,
        // BarcodeFormat.CODE_93,
        BarcodeFormat.DATA_MATRIX,
        // BarcodeFormat.EAN_8,
        // BarcodeFormat.MAXICODE,
        // BarcodeFormat.PDF_417,
        // BarcodeFormat.RSS_14,
    ];

    hasDevices: boolean;
    hasPermission: boolean;

    qrResultString: string;

    torchEnabled = false;
    torchAvailable$ = new BehaviorSubject<boolean>(false);
    tryHarder = false;
    isExchange = false;
    constructor(
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { isExchange: boolean },

    ) {
        this.data?.isExchange ? this.isExchange = true : this.isExchange = false;
    }
    ngOnInit(): void {
        this.formSearch = this.fb.group({
            search: new FormControl('', Validators.required)
        });
    }


    clearResult(): void {
        this.formSearch.get('search').setValue('');
        this.qrResultString = null;
    }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCodeResult(resultString: string) {
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
    errorCatch(error): void {
        console.log(error);
    }

    toggleTorch(): void {
        this.torchEnabled = !this.torchEnabled;
    }

    toggleTryHarder(): void {
        this.tryHarder = !this.tryHarder;
    }

}
