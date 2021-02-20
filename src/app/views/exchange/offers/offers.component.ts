import {Component, OnInit} from '@angular/core';
import {BookStatus, getArrayStatus} from '../../../models/enums/BookStatus.enum';
import {BookAdsService} from '../../../services/book-ads.service';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter, map, take} from 'rxjs/operators';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
    booksAds$: Observable<BookAdTO[]>;
    statusList = getArrayStatus();
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

    searchBooksAds(): Observable<BookAdTO[]> {
        // this.formSearch.get('search').valueChanges.pipe(
        //     filter(formdata => formdata.search.length > 0),
        //     switchMap( formdata => this.service.getNames(formdata.name)) ,
        //     map(booksAds => {
        //         return booksAds.filter(b => b.description.toLocaleLowerCase().includes(form.toLocaleLowerCase()));
        //     })
        // )

        // if (search === undefined || search === null) {
        //    return this.booksAds$;
        // }
        // console.log(search);
        // this.booksAds$.pipe(
        //     take(1),
        //     map(booksAds => {
        //         return booksAds.filter(b => b.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        //     })
        // ).subscribe(res => {
        //     console.log (res);
        // })
        return  this.booksAds$.pipe(
            map(booksAds => {
               return booksAds.filter(b => b.description.toLocaleLowerCase().includes('search'.toLocaleLowerCase()));
            })
        );
    }

}
