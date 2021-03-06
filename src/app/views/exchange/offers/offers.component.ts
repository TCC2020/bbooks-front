import {Component, OnInit} from '@angular/core';
import {BookAdsService} from '../../../services/book-ads.service';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
    booksAds$: Observable<BookAdTO[]>;
    formSearch: FormGroup;

    constructor(
        public bookAdsService: BookAdsService,
        public fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.formSearch = this.fb.group({
            search: ['']
        });
        this.booksAds$ = this.bookAdsService.getAll();
    }
}
