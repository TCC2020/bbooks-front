import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReviewTO} from '../../../models/ReviewTO.model';
import {ReviewService} from '../../../services/review.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-review-dialog',
    templateUrl: './review-dialog.component.html',
    styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

    public formReview: FormGroup;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { review: ReviewTO },
        private formBuilder: FormBuilder,
        private reviewService: ReviewService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formReview = this.formBuilder.group({
            id: new FormControl(this.data.review?.id ? this.data.review.id : ''),
            title: new FormControl(this.data.review?.title ? this.data.review.id : ''),
            body: new FormControl(this.data.review?.body ? this.data.review.body : '', Validators.compose([
                Validators.maxLength(200)
            ])),
            bookId: new FormControl(this.data?.review.bookId),
            idGoogleBook: new FormControl(this.data?.review.idGoogleBook),
            profileId: new FormControl(this.data?.review.profileId)

            // creationDate: new FormControl(this.data?.review.creationDate),
        });
    }

    save() {
        console.log(this.data)
        if (this.data.review.id) {
            console.log(this.formReview.value)
            this.reviewService.update(this.formReview.value)
                .pipe(take(1))
                .subscribe(result => {
                    console.log(result);
                });
        } else {
            this.reviewService.save(this.formReview.value)
                .pipe(take(1))
                .subscribe(result => {
                    console.log(result);
                });
        }
    }
}
