import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {ProfileService} from '../../../services/profile.service';
import {Role} from '../../../models/enums/Role.enum';
import {Util} from '../../shared/Utils/util';
import {FormBuilder, FormGroup} from '@angular/forms';

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
                    this.getMembers();
                }
            );
    }

    getMembers() {
        this.loading = true;
        this.competitionMemberService.getMembers(this.literaryCompetitionId, this.page, 4)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length > 0) {
                    const r = result.content.filter(i => i.role === Role.owner || i.role === Role.admin);
                    this.page++;
                    if (r.length === 0) {
                        this.getMembers();
                    } else {
                        this.administrators = this.administrators.concat(r);
                        this.getProfiles();
                    }
                }
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

    onScroll() {
        this.getMembers();
    }

}
