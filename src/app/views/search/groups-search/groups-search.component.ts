import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {GroupService} from '../../../services/group.service';
import {GroupTO} from '../../../models/GroupTO.model';

@Component({
    selector: 'app-groups-search',
    templateUrl: './groups-search.component.html',
    styleUrls: ['./groups-search.component.scss']
})
export class GroupsSearchComponent implements OnInit {
    loading = false;
    page = 0;
    search: string;
    groups: GroupTO[] = [];
    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService
    ) {}

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(result => {
                    this.search = result;
                    this.getGroups();
                }
            );
    }

    onScroll() {
        this.getGroups();
    }
    getGroups(): void {
        this.loading = true;
        this.groupService.getByName(this.search, 5, this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length > 0) {
                    this.page++;
                    this.groups = this.groups.concat(result.content);
                }
            });
    }


}
