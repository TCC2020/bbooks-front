import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
import {CompetitionMemberSaveTO} from '../../../models/competitionMemberSaveTO.model';
import {LiteraryMemberStatus} from '../../../models/enums/LiteraryMemberStatus.enum';

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
    member: CompetitionMemberTO;

    constructor(
        private route: ActivatedRoute,
        private competitionService: CompetitionService,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService,
        private authService: AuthService,
        private router: Router
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
        this.getProfile();
    }


    isUserAdministrator(): boolean {
        Util.loadingScreen();
        this.competitionMemberService.getMembers(this.literaryCompetitionId, this.page, 10)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                if (result.content.length > 0) {
                    const r = result.content.find(i => i.profileId === this.authService.getUser().profile.id);
                    this.page++;
                    if (r) {
                        this.member = r;
                        if (r.role === Role.owner || r.role === Role.admin) {
                            this.isAdmin = true;
                        } else {
                            this.isMember = true;
                        }
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
        Util.loadingScreen();
        const competitionMemberSaveTO = new CompetitionMemberSaveTO();
        competitionMemberSaveTO.competitionId = this.literaryCompetitionId;
        competitionMemberSaveTO.profileId = this.profile.id;
        competitionMemberSaveTO.role = Role.member;
        competitionMemberSaveTO.story = null;
        competitionMemberSaveTO.title = null;
        competitionMemberSaveTO.status = LiteraryMemberStatus.accept;
        this.competitionMemberService.saveMember(competitionMemberSaveTO)
            .pipe(take(1))
            .subscribe(() => {
                Util.stopLoading();
                this.isMember = true;
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }

    removeMember() {
        Util.loadingScreen();
        this.competitionMemberService.exitMember(this.member.memberId)
            .pipe(take(1))
            .subscribe( () => {
                Util.stopLoading();
                this.isMember = false;
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }


    getProfile() {
        Util.loadingScreen();
        this.profileService.getById(this.authService.getUser().profile.id)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                this.profile = result;
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }
}
