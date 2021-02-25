import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Observable} from 'rxjs';
import {BookAdsService} from '../../../services/book-ads.service';

@Component({
    selector: 'app-search-book-adto',
    templateUrl: './search-book-adto.component.html',
    styleUrls: ['./search-book-adto.component.scss']
})
export class SearchBookAdtoComponent implements OnInit {
    formSearch: FormGroup;
    booksAdsTo: Observable<BookAdTO[]>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { idUserOffer: string, bookAdsSelected: BookAdTO[] },
        public fb: FormBuilder,
        public bookAdsService: BookAdsService,
        public dialogRef: MatDialogRef<SearchBookAdtoComponent>,
    ) {
        this.formSearch = this.fb.group({
            search: ['']
        });
    }

    ngOnInit(): void {
        this.booksAdsTo =
            this.bookAdsService.getAllByUser(this.data.idUserOffer);
    }

    verifyBookAdIsSelected(idBookAd: string): boolean {
        const result = this.data.bookAdsSelected.find(b => b.id === idBookAd);
        return result ? true : false;
    }

    selectBookAd(bookAd: BookAdTO): void {
        if (!this.verifyBookAdIsSelected(bookAd.id)) {
            this.dialogRef.close(bookAd);
        }
    }

}
