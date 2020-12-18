import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReviewTO} from '../../../models/ReviewTO.model';
import {ReviewService} from '../../../services/review.service';
import {take} from 'rxjs/operators';
import {Book} from '../../../models/book.model';
import {Tag} from '../../../models/tag';
import {ProfileService} from '../../../services/profile.service';

@Component({
    selector: 'app-review-dialog',
    templateUrl: './review-dialog.component.html',
    styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

    public formReview: FormGroup;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { review: ReviewTO, book: Book },
        private formBuilder: FormBuilder,
        private reviewService: ReviewService,
        public dialogRef: MatDialogRef<any>,
        public profileService: ProfileService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formReview = this.formBuilder.group({
            id: new FormControl(this.data.review?.id ? this.data.review.id : ''),
            title: new FormControl(this.data.review?.title ? this.data.review.title : ''),
            body: new FormControl(this.data.review?.body ? this.data.review.body : '', Validators.compose([
                Validators.maxLength(300)
            ])),
            bookId: new FormControl(this.data?.review.bookId),
            idGoogleBook: new FormControl(this.data?.review.idGoogleBook),
            profileId: new FormControl(this.data?.review.profileId)

            // creationDate: new FormControl(this.data?.review.creationDate),
        });
    }

    save() {
        if (this.data.review.id) {
            this.reviewService.update(this.formReview.value)
                .pipe(take(1))
                .subscribe(result => {
                    this.dialogRef.close(result);
                });
        } else {
            this.reviewService.save(this.formReview.value)
                .pipe(take(1))
                .subscribe(result => {
                    result.profileTO = this.profileService.getById(result.profileId);
                    this.dialogRef.close(result);
                });
        }
    }
}
