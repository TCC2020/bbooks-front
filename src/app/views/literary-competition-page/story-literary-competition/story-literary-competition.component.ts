import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ProfileService} from '../../../services/profile.service';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-story-literary-competition',
    templateUrl: './story-literary-competition.component.html',
    styleUrls: ['./story-literary-competition.component.scss']
})
export class StoryLiteraryCompetitionComponent implements OnInit {

    memberId: string;
    members: CompetitionMemberTO[] = [];
    member: CompetitionMemberTO;

    constructor(
        private route: ActivatedRoute,
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
                    this.memberId = result;
                    this.getMember();
                }, error => {
                    console.log(error);
                }
            );
    }

    getMember() {
        this.competitionMemberService.getMember(this.memberId)
            .pipe(take(1))
            .subscribe(member => {
                this.member = member;
                this.getProfile();
            }, error => {
                console.log(error);
            });
    }

    getProfile() {
        Util.loadingScreen();
        this.competitionMemberService.getMember(this.memberId)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                Util.loadingScreen();
                this.profileService
                    .getById(result.profile.id)
                    .pipe(take(1))
                    .subscribe(profileMember => {
                        Util.stopLoading();
                        this.member.profile = profileMember;
                    }, error => {
                        console.log(error);
                        Util.stopLoading();
                    });
            }, error => {
                console.log(error);
                Util.stopLoading();
            });
    }
}
