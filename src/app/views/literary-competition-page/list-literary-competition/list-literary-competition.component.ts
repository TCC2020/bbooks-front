import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ActivatedRoute} from '@angular/router';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-list-literary-competition',
    templateUrl: './list-literary-competition.component.html',
    styleUrls: ['./list-literary-competition.component.scss']
})
export class ListLiteraryCompetitionComponent implements OnInit {

    loading = false;
    page = 0;
    competitions: CompetitionTO[] = [];

    constructor(
        private competitionMemberService: CompetitionMemberService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.getCompetitionByProfile();
    }

    getCompetitionByProfile() {
        this.loading = true;
        this.competitionMemberService.getCompetitionByProfile(this.authService.getUser().profile.id, this.page, 12)
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
        this.getCompetitionByProfile();
    }

}
