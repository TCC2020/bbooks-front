import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {ProfileService} from '../../../services/profile.service';
import {Role} from '../../../models/enums/Role.enum';
import {Util} from '../../shared/Utils/util';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LiteraryMemberStatus} from '../../../models/enums/LiteraryMemberStatus.enum';

@Component({
    selector: 'app-administrators-literary-competition',
    templateUrl: './administrators-literary-competition.component.html',
    styleUrls: ['./administrators-literary-competition.component.scss']
})
export class AdministratorsLiteraryCompetitionComponent implements OnInit {


    loading = false;
    literaryCompetitionId: string;
    page = 0;
    administrators: CompetitionMemberTO[] = [];
    searchAdministrators: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private competitionMemberService: CompetitionMemberService,
        private fb: FormBuilder
    ) {
        this.searchAdministrators = this.fb.group({
            nameAdministrator: ['']
        });
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.literaryCompetitionId = result;
                    this.getOwner();
                    this.getMembers();
                }
            );
    }

    getOwner() {
        this.competitionMemberService.getMembersByRoleAndStatus(this.literaryCompetitionId, Role.owner, LiteraryMemberStatus.pending)
            .pipe(take(1))
            .subscribe(result => {
                this.administrators = result;
            });
    }

    getMembers() {
        this.competitionMemberService.getMembersByRoleAndStatus(this.literaryCompetitionId, Role.admin, LiteraryMemberStatus.accept)
            .pipe(take(1))
            .subscribe(result => {
                this.administrators = this.administrators.concat(result);
            });
    }

    getProfiles() {
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
    }

    searchAdministrator() {
        const formSearch = this.searchAdministrators.get('nameAdministrator').value;
        if (!formSearch) {
            return this.administrators;
        }
        return this.administrators.filter(p =>
            p?.profile?.name.concat(p?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(formSearch.toLocaleLowerCase().replace(' ', ''))
        );
    }

    /*onScroll() {
        this.getMembers();
    }*/

}
