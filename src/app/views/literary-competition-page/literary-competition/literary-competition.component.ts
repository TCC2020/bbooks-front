import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ProfileService} from '../../../services/profile.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';

@Component({
    selector: 'app-literary-competition',
    templateUrl: './literary-competition.component.html',
    styleUrls: ['./literary-competition.component.scss']
})
export class LiteraryCompetitionComponent implements OnInit {

    competitionTO: CompetitionTO;
    members: CompetitionMemberTO[] = [];
    administrators: CompetitionMemberTO[] = [];
    literaryCompetitionId: string;

    constructor(
        private route: ActivatedRoute,
        private competitionService: CompetitionService,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.getById(result);
                    this.literaryCompetitionId = result;
                    this.getMembers();
                }
            );
    }


    isUserAdministrator(): boolean {
        return true;
    }

    getById(id: string) {
        this.competitionService.getById(id)
            .pipe(take(1))
            .subscribe(result => {
                this.competitionTO = result;
            }, error => {
                console.log(error);
            });
    }

    getMembers() {
        this.competitionMemberService.getMembers(this.literaryCompetitionId, 0, 5)
            .pipe(take(1))
            .subscribe(result => {
                this.members.filter(i => i.role === 'member');
                console.log(this.members);
                if (result.content.length > 0) {
                    this.members = this.members.filter(i => i.role === 'member').concat(result.content);
                    this.getProfiles();
                }
            });
    }

    getProfiles() {
        this.members.forEach((a, i) => {
            if (!a.profile) {
                this.profileService.getById(a.profileId)
                    .pipe(take(1))
                    .subscribe(result => {
                        this.members[i].profile = result;
                    });
            }
        });
    }

}
