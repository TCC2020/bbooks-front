import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Role} from '../../../models/enums/Role.enum';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {Util} from '../../shared/Utils/util';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LiteraryMemberStatus} from '../../../models/enums/LiteraryMemberStatus.enum';
import {CompetitionMemberSaveTO} from '../../../models/competitionMemberSaveTO.model';

@Component({
    selector: 'app-registrations',
    templateUrl: './registrations.component.html',
    styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

    loading = false;
    literaryCompetitionId: string;
    page = 0;
    members: CompetitionMemberTO[] = [];
    searchMembers: FormGroup;
    dataAtual = Date.now();

    constructor(
        private competitionMemberService: CompetitionMemberService,
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.searchMembers = this.fb.group({
            nameMember: ['']
        });
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.literaryCompetitionId = result;
                    this.getMembers();
                }
            );
    }

    getMembers() {
        this.competitionMemberService.getMembersByRoleAndStatus(this.literaryCompetitionId, Role.member, LiteraryMemberStatus.pending)
            .pipe(take(1))
            .subscribe(result => {
                this.members = result;
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

    searchMember() {
        const formSearch = this.searchMembers.get('nameMember').value;
        if (!formSearch) {
            return this.members;
        }
        return this.members.filter(p =>
            p?.profile?.name.concat(p?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(formSearch.toLocaleLowerCase().replace(' ', ''))
        );
    }

    acceptMember(id: string) {
        Util.loadingScreen();
        this.competitionMemberService.getMember(id)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                const competitionMemberSaveTO = new CompetitionMemberSaveTO();
                competitionMemberSaveTO.memberId = result.memberId;
                competitionMemberSaveTO.competitionId = result.competitionTO.id;
                competitionMemberSaveTO.status = LiteraryMemberStatus.accept;
                competitionMemberSaveTO.title = result.title;
                competitionMemberSaveTO.story = result.story;
                competitionMemberSaveTO.role = result.role;
                competitionMemberSaveTO.profileId = result.profile.id;
                Util.loadingScreen();
                this.competitionMemberService.updateMember(competitionMemberSaveTO, result.memberId)
                    .pipe(take(1))
                    .subscribe(() => {
                        Util.stopLoading();
                        window.location.reload();
                    }, error => {
                        console.log(error);
                    });
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }

    recuseMember(id: string) {
        Util.loadingScreen();
        this.competitionMemberService.getMember(id)
            .pipe(take(1))
            .subscribe(result => {
                Util.stopLoading();
                const competitionMemberSaveTO = new CompetitionMemberSaveTO();
                competitionMemberSaveTO.memberId = result.memberId;
                competitionMemberSaveTO.competitionId = result.competitionTO.id;
                competitionMemberSaveTO.status = LiteraryMemberStatus.refused;
                competitionMemberSaveTO.title = result.title;
                competitionMemberSaveTO.story = result.story;
                competitionMemberSaveTO.role = result.role;
                competitionMemberSaveTO.profileId = result.profile.id;
                Util.loadingScreen();
                this.competitionMemberService.updateMember(competitionMemberSaveTO, result.memberId)
                    .pipe(take(1))
                    .subscribe(() => {
                        Util.stopLoading();
                        window.location.reload();
                    }, error => {
                        console.log(error);
                    });
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }

    verifyDate(date: Date): boolean {
        if (date) {
            if (this.dataAtual <= Date.parse(date.toString())) {
                return false;
            }
        }
        return true;
    }
}
