import {Component, OnInit} from '@angular/core';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-competition-search',
    templateUrl: './competition-search.component.html',
    styleUrls: ['./competition-search.component.scss']
})
export class CompetitionSearchComponent implements OnInit {
    competitions: CompetitionTO[] = [];
    loading = false;
    page = 0;
    search: string;
    constructor(
        public competitonService: CompetitionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(result => {
                    this.search = result;
                    this.getCompetitions();
                }
            );
    }

    getCompetitions() {
        this.loading = true;
        this.competitonService.search(this.search, this.page, 12)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length > 0) {
                    this.page++;
                    this.competitions = this.competitions.concat(result.content);
                }
            });
    }

    onScroll() {
        this.getCompetitions();
    }

}
