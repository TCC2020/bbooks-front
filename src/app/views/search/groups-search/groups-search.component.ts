import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-groups-search',
    templateUrl: './groups-search.component.html',
    styleUrls: ['./groups-search.component.scss']
})
export class GroupsSearchComponent implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(params => {
                    console.log(params);
                }
            );
    }

}
