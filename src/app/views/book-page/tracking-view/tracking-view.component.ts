import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReadingTrackingTO} from '../../../models/ReadingTrackingTO.model';
import {TranslateService} from '@ngx-translate/core';
import {ReadingTrackingService} from '../../../services/reading-tracking.service';
import {take} from 'rxjs/operators';
import {TrackingTO} from '../../../models/TrackingTO.model';
import {TrackingService} from '../../../services/tracking.service';

@Component({
    selector: 'app-tracking-view',
    templateUrl: './tracking-view.component.html',
    styleUrls: ['./tracking-view.component.scss']
})
export class TrackingViewComponent implements OnInit {

    public formTracking: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { tracking: TrackingTO, idUserbook: number},
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ReadingTrackingTO>,
        public translate: TranslateService,
        private trackingService: TrackingService,
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
            comentario: new FormControl(this.data.tracking?.comentario ? this.data.tracking.comentario : '', Validators.compose([
                Validators.maxLength(50)
            ])),
            userBookId: new FormControl(this.data?.idUserbook),
            trackings: this.formBuilder.array([])
        });
    }

    save() {
        if (this.data.tracking?.id) {
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
                    if (error.error.message.includes('TA001')) {
                        codMessage = 'TA001';
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
        // this.trackingService.delete(this.data.tracking.id).subscribe(() => {
        //         this.dialogRef.close('delete');
        //     },
        //     error => {
        //         console.log('error tracking delete', error);
        //     });
    }
}
