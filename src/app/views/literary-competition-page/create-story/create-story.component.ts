import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {AuthService} from '../../../services/auth.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CompetitionMemberService} from '../../../services/competition-member.service';

@Component({
    selector: 'app-create-story',
    templateUrl: './create-story.component.html',
    styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnInit {

    formCreateStory: FormGroup;
    competitionMemberTO: CompetitionMemberTO;
    memberId: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private competitionMemberService: CompetitionMemberService,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    if (result) {
                        this.memberId = result;
                    }
                }
            );
        this.competitionMemberService.getMember(this.memberId)
            .pipe(take(1))
            .subscribe(result => {
                this.competitionMemberTO = result;
                this.createForm();
            });
        this.createForm();
    }

    private createForm() {
        this.formCreateStory = this.formBuilder.group({
            memberId: new FormControl(this.memberId),
            title: new FormControl(this.competitionMemberTO ? this.competitionMemberTO.title : null, Validators.required),
            story: new FormControl(this.competitionMemberTO ? this.competitionMemberTO.story : null, Validators.required),
            profileId: new FormControl(this.competitionMemberTO?.profile.id),
            role: new FormControl(this.competitionMemberTO?.role),
            status: new FormControl(this.competitionMemberTO?.status),
            competitionId: new FormControl(this.competitionMemberTO?.competitionTO?.id)
        });
    }

    createStory() {
        this.competitionMemberService.updateMember(this.formCreateStory.value, this.memberId)
            .pipe(take(1))
            .subscribe( () => {
                this.router.navigateByUrl('literary-competition/' + this.competitionMemberTO.competitionTO.id);
            }, error => {
                console.log(error);
            });
    }

    editStory() {

    }
}
