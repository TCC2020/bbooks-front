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
        // this.getMembers();
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

    /*getMembers() {
        this.loading = true;
        this.competitionMemberService.getMembers(this.literaryCompetitionId, 0, 30)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length > 0) {
                    const qtdeMembers = this.members.length;
                    const qtdeAdmin = this.administrators.length;
                    result.content.forEach(m => {
                        if (m.role === Role.member) {
                            if (qtdeMembers < 5) {
                                this.members.push(m);
                            }
                        }
                        if (m.role === Role.admin || m.role === Role.owner) {
                            if (qtdeAdmin < 5) {
                                this.administrators.push(m);
                            }
                        }
                    });
                    if (this.members.length < 5 || this.administrators.length < 5) {
                        this.getMembers();
                    } else {
                        this.getProfiles();
                        this.getProfilesAdmin();
                    }
                }
            });
    }

    getProfiles() {
        Util.loadingScreen();
        this.members.forEach((a, i) => {
            if (!a.profile) {
                this.profileService.getById(a.profileId)
                    .pipe(take(1))
                    .subscribe(result => {
                        Util.stopLoading();
                        this.members[i].profile = result;
                    }, error => {
                        console.log(error);
                        Util.stopLoading();
                    });
            }
        });
    }

    getProfilesAdmin() {
        Util.loadingScreen();
        this.administrators.forEach((a, i) => {
            if (!a.profile) {
                this.profileService.getById(a.profileId)
                    .pipe(take(1))
                    .subscribe(result => {
                        Util.stopLoading();
                        this.administrators[i].profile = result;
                    }, error => {
                        console.log(error);
                        Util.stopLoading();
                    });
            }
        });
    }*/
}
