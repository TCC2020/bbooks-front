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
import {StoryLiteraryCompetitionComponent} from '../story-literary-competition/story-literary-competition.component';
import {MatDialog} from '@angular/material/dialog';
import {CompetitionVoteService} from '../../../services/competition-vote.service';
import {CompetitionVotesSaveTO} from '../../../models/competitionVotesSaveTO.model';
import {AuthService} from '../../../services/auth.service';
import {VoteComponent} from '../vote/vote.component';

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
    dataAtual = Date.now();
    verifyDateVote: boolean;

    constructor(
        private route: ActivatedRoute,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private authService: AuthService,
        private competitionVoteService: CompetitionVoteService
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
        this.competitionMemberService.getMembersByRoleAndStatus(this.literaryCompetitionId, Role.member, LiteraryMemberStatus.accept)
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
        const formSearch = this.searchMembers.get('nameMembers').value;
        if (!formSearch) {
            return this.members;
        }
        return this.members.filter(p =>
            p?.profile?.name.concat(p?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(formSearch.toLocaleLowerCase().replace(' ', ''))
        );
    }

    openDialogSeeStory(member: CompetitionMemberTO) {
        const dialogRef = this.dialog.open(StoryLiteraryCompetitionComponent, {
            height: '450px',
            width: '100%',
            data: member
        });
        dialogRef.afterClosed().subscribe((result) => {
            // this.getBook(result);
        });
    }

    /*vote(memberTO: CompetitionMemberTO) {
        const competitionVotesSaveTO = new CompetitionVotesSaveTO();
        competitionVotesSaveTO.memberId = memberTO.memberId;
        competitionVotesSaveTO.profileId = this.authService.getUser().profile.id;
        competitionVotesSaveTO.value = 10;
        console.log(competitionVotesSaveTO);
        this.competitionVoteService.vote(competitionVotesSaveTO)
            .pipe(take(1))
            .subscribe(result => {
                console.log(result);
            }, error => {
                console.log(error);
            });
    }*/

    openDialogVote(member: CompetitionMemberTO) {
        const dialogRef = this.dialog.open(VoteComponent, {
            height: '300px',
            width: '350px',
            data: member
        });
        dialogRef.afterClosed().subscribe((result) => {
            // this.getBook(result);
        });
    }

    verifyDate(finalSub: Date, finalCompetition: Date): boolean {
        if (finalSub && finalCompetition) {
            if (Date.parse(finalSub.toString()) <= this.dataAtual && this.dataAtual <= Date.parse(finalCompetition.toString())) {
                return true;
            }
            return false;
        }
    }

    verifyUser(profileIdVote: number): boolean {
        if (profileIdVote === this.authService.getUser().profile.id) {
            return true;
        }
        return false;
    }

}
