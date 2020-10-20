import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ReadingTrackingTO} from '../../../models/ReadingTrackingTO.model';
import {ReadingTrackingService} from '../../../services/reading-tracking.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-tracking-dialog',
    templateUrl: './tracking-dialog.component.html',
    styleUrls: ['./tracking-dialog.component.scss']
})
export class TrackingDialogComponent implements OnInit {

    public formTracking: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { tracking: ReadingTrackingTO, idUserbook: number, canEditPag: boolean, trackingUpId },
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ReadingTrackingTO>,
        public translate: TranslateService,
        private trackingService: ReadingTrackingService,
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formTracking = this.formBuilder.group({
            id: new FormControl(this.data.tracking?.id ? this.data.tracking.id : ''),
            numPag: new FormControl({
                value: this.data.tracking?.numPag ? this.data.tracking.numPag : '',
                disabled: this.data.canEditPag
            }, Validators.required),
            comentario: new FormControl(this.data.tracking?.comentario ? this.data.tracking.comentario : '', Validators.compose([
                Validators.maxLength(50)
            ])),
            percentage: new FormControl(''),
            userBookId: new FormControl(this.data?.idUserbook),
            trackingUpId: new FormControl(this.data.trackingUpId ? this.data.trackingUpId : '')
        });
    }

    save() {
        if (this.data.tracking?.id) {
            if (this.formTracking.get('numPag').value) {
                this.data.tracking.numPag = this.formTracking.get('numPag').value;
            }
            this.data.tracking.comentario = this.formTracking.get('comentario').value;
            this.trackingService.update(this.data.tracking).pipe(take(1)).subscribe(tracking => {
                    this.dialogRef.close(tracking);
                },
                error => {
                    let codMessage = '';
                    if (error.error.message.includes('RT002')) {
                        codMessage = 'RT002';
                    }
                    if (error.error.message.includes('RT003')) {
                        codMessage = 'RT003';
                    }
                    if (error.error.message.includes('RT005')) {
                        codMessage = 'RT005';
                    }
                    if (codMessage) {
                        this.translate.get('MESSAGE_ERROR.' + codMessage).subscribe(message => {
                            alert(message);
                        });
                    } else {
                        console.log(error);
                    }
                });
        } else {
            this.trackingService.save(this.formTracking.value).pipe(take(1)).subscribe(tracking => {
                    this.dialogRef.close(tracking);
                },
                error => {
                    let codMessage = '';
                    if (error.error.message.includes('RT002')) {
                        codMessage = 'RT002';
                    }
                    if (error.error.message.includes('RT003')) {
                        codMessage = 'RT003';
                    }
                    if (error.error.message.includes('RT005')) {
                        codMessage = 'RT005';
                    }
                    if (codMessage) {
                        this.translate.get('MESSAGE_ERROR.' + codMessage).subscribe(message => {
                            alert(message);
                        });
                    } else {
                        console.log(error);
                    }
                });
        }

    }

    delete() {
        this.data.tracking.trackingUpId = this.data.trackingUpId;
        this.trackingService.delete(this.data.tracking.id, this.data.tracking).subscribe(() => {
                this.dialogRef.close('delete');
            },
            error => {
                console.log('error tracking delete', error);
            });
    }

}
