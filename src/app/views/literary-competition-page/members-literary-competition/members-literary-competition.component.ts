import {Component, OnInit} from '@angular/core';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ProfileService} from '../../../services/profile.service';
import {Role} from '../../../models/enums/Role.enum';
import {Util} from '../../shared/Utils/util';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LiteraryMemberStatus} from '../../../models/enums/LiteraryMemberStatus.enum';

@Component({
    selector: 'app-members-literary-competition',
    templateUrl: './members-literary-competition.component.html',
    styleUrls: ['./members-literary-competition.component.scss']
})
export class MembersLiteraryCompetitionComponent implements OnInit {

    loading = false;
    literaryCompetitionId: string;
    page = 0;
    members: CompetitionMemberTO[] = [];
    listMembers: CompetitionMemberTO[] = [];
    indexMember = 0;
    searchMembers: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.literaryCompetitionId = result;
                }
            );
        this.getMembers();
        this.searchMembers = this.fb.group({
                nameMembers: ['']
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
                    const r = result.content.filter(i => i.role === Role.member && i.status === LiteraryMemberStatus.accept);
                    console.log(r);
                    this.page++;
                    if (r.length === 0) {
                        this.getMembers();
                    } else {
                        this.members = this.members.concat(r);
                        this.getProfiles();
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

    searchMember() {
        const formSearch = this.searchMembers.get('nameMembers').value;
        if (!formSearch) {
            return this.members;
        }
        return this.members.filter(p =>
            p?.profile?.name.concat(p?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(formSearch.toLocaleLowerCase().replace(' ', ''))
        );
    }

    onScroll() {
        this.getMembers();
    }

}
