import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ProfileService} from '../../../services/profile.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {Role} from '../../../models/enums/Role.enum';
import {Util} from '../../shared/Utils/util';
import {AuthService} from '../../../services/auth.service';
import {Profile} from '../../../models/profileTO.model';

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
    page = 0;
    isAdmin = false;
    isMember = false;
    profile: Profile;

    constructor(
        private route: ActivatedRoute,
        private competitionService: CompetitionService,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService,
        private authService: AuthService
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
                }
            );
        this.isUserAdministrator();
    }


    isUserAdministrator(): boolean {
        Util.loadingScreen();
        this.competitionMemberService.getMembers(this.literaryCompetitionId, this.page, 10)
            .pipe(take(1))
            .subscribe(result => {
                console.log(result);
                Util.stopLoading();
                if (result.content.length > 0) {
                    const r = result.content.find(i => i.profileId === this.authService.getUser().profile.id);
                    this.page++;
                    if (r) {
                        if (r.role === Role.owner || r.role === Role.admin) {
                            this.isAdmin = true;
                        }
                        this.isMember = true;
                    } else {
                        this.isUserAdministrator();
                    }
                }
            }, error => {
                console.log(error);
                Util.stopLoading();
            });
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

    addMember() {

    }

    removeMember() {

    }

    getProfile() {
        this.profileService.getById(this.authService.getUser().profile.id)
            .pipe(take(1))
            .subscribe(result => {
                this.profile = result;
            });
    }
}
