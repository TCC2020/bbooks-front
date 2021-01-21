import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadComponent} from '../../upload/upload.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-offer-new',
    templateUrl: './offer-new.component.html',
    styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    files = [];
    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,

    ) {
    }

    ngOnInit(): void {
        this.firstFormGroup = this.formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
    openDialogUpload(position: number) {
        const dialogRef = this.dialog.open(UploadComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.readFile(position, result);
                // this.formCadastro2.get('image').setValue(result.name);
            }
        });
    }
    readFile(position: number, file: any) {
        this.files[position] = file;
        const reader = new FileReader();
        reader.onload = (e) => this.files[position] = e.target.result;
        reader.readAsDataURL(this.files[position]);
    }
}
