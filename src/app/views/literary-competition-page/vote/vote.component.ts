import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {CompetitionVotesSaveTO} from '../../../models/competitionVotesSaveTO.model';
import {AuthService} from '../../../services/auth.service';
import {CompetitionVoteService} from '../../../services/competition-vote.service';
import {max, take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {ProfileService} from '../../../services/profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetitionVoteReturnTO} from '../../../models/competitionVoteReturnTO.model';

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

    formVote: FormGroup;
    competitionVotesSaveTO: CompetitionVotesSaveTO;

    constructor(
        @Inject(MAT_DIALOG_DATA) public member: CompetitionMemberTO,
        public dialogRef: MatDialogRef<VoteComponent>,
        private authService: AuthService,
        private competitionVoteService: CompetitionVoteService,
        private competitionMemberService: CompetitionMemberService,
        private profileService: ProfileService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.getProfile();
    }

    createForm() {
        this.formVote = this.formBuilder.group({
            note: new FormControl(null, Validators.compose([
                    Validators.max(10),
                    Validators.min(1)
                ]
            ))
        });
    }

    vote() {
        const competitionVotesSaveTO = new CompetitionVotesSaveTO();
        competitionVotesSaveTO.memberId = this.member.memberId;
        competitionVotesSaveTO.profileId = this.authService.getUser().profile.id;
        competitionVotesSaveTO.value = this.formVote.get('note').value;
        console.log(competitionVotesSaveTO);
        this.competitionVoteService.vote(competitionVotesSaveTO)
            .pipe(take(1))
            .subscribe(result => {
                Util.showSuccessDialog('Seu voto foi registrado com sucesso!');
            }, error => {
                console.log(error);
            });
    }

    getProfile() {
        Util.loadingScreen();
        this.competitionMemberService.getMember(this.member.memberId)
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
