import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Tag} from '../../../models/tag';
import {AuthService} from '../../../services/auth.service';
import {TagService} from '../../../services/tag.service';
import {TranslateService} from '@ngx-translate/core';
import {ReadingTrackingTO} from '../../../models/ReadingTrackingTO.model';
import {ReadingTrackingService} from '../../../services/reading-tracking.service';
import {take} from 'rxjs/operators';
import {UserbookService} from '../../../services/userbook.service';
import {UserBookTO} from '../../../models/userBookTO';

@Component({
    selector: 'app-tracking-dialog',
    templateUrl: './tracking-dialog.component.html',
    styleUrls: ['./tracking-dialog.component.scss']
})
export class TrackingDialogComponent implements OnInit {

    public formTracking: FormGroup;

    public textForm: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { tracking: ReadingTrackingTO, idUserbook: number },
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public dialogRef: MatDialogRef<ReadingTrackingTO>,
        public translate: TranslateService,
        private trackingService: ReadingTrackingService,
    ) {
    }

    ngOnInit(): void {
        // if (this.tag) {
        //     this.translate.get('PADRAO.EDITAR').subscribe(text => {
        //         this.textForm = text;
        //     });
        // } else {
        //     this.translate.get('PADRAO.CRIAR').subscribe(text => {
        //         this.textForm = text;
        //     });
        // }
        this.createForm();
    }

    private createForm(): void {
        this.formTracking = this.formBuilder.group({
            id: new FormControl(this.data.tracking?.id ? this.data.tracking.id : ''),
            numPag: new FormControl(this.data.tracking?.numPag ? this.data.tracking.numPag : '', Validators.required),
            comentario: new FormControl(this.data.tracking?.comentario ? this.data.tracking.comentario : '', Validators.compose([
                Validators.maxLength(60)
            ])),
            percentage: new FormControl(''),
            userBookId: new FormControl(this.data?.idUserbook)
        });
    }

    save() {
        if (this.data.tracking?.id) {
            this.trackingService.update(this.formTracking.value).pipe(take(1)).subscribe(tracking => {
                    this.dialogRef.close(tracking);
                },
                error => {
                    console.log('error tracking update', error);
                });
        } else {
            this.trackingService.save(this.formTracking.value).pipe(take(1)).subscribe(tracking => {
                    this.dialogRef.close(tracking);
                },
                error => {
                    console.log('error tracking', error);
                });
        }

    }

}
