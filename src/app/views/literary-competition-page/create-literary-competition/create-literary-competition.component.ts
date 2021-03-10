import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetitionTO} from '../../../models/competitionTO.model';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {AuthService} from '../../../services/auth.service';
import {CompetitionService} from '../../../services/competition.service';
import {map, take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-create-literary-competition',
    templateUrl: './create-literary-competition.component.html',
    styleUrls: ['./create-literary-competition.component.scss']
})
export class CreateLiteraryCompetitionComponent implements OnInit {

    formCreateLiterary: FormGroup;
    competitionTO: CompetitionTO;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private competitionService: CompetitionService,
        private router: Router,
        private route: ActivatedRoute,
        private adapter: DateAdapter<any>,
        private translate: TranslateService
    ) {
        const browserLang = this.translate.getBrowserLang().toString();
        this.adapter.setLocale(browserLang);
        this.authService.language.subscribe(lang => {
            this.adapter.setLocale(lang);
        });
    }

    ngOnInit(): void {
        this.createForm();
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    if (result) {
                        this.getById(result);
                    }
                }
            );
    }

    private createForm() {
        this.formCreateLiterary = this.formBuilder.group({
            id: new FormControl(this.competitionTO ? this.competitionTO.id : null),
            title: new FormControl(this.competitionTO ? this.competitionTO.title : null, Validators.required),
            rules: new FormControl(this.competitionTO ? this.competitionTO.rules : null, Validators.required),
            finalDate: new FormControl(this.competitionTO ? this.competitionTO.finalDate : null, Validators.required),
            subscriptionDate: new FormControl(this.competitionTO ? this.competitionTO.subscriptionDate : null, Validators.required),
            subscriptionFinalDate: new FormControl(this.competitionTO ?
                this.competitionTO.subscriptionFinalDate : null, Validators.required),
            creatorProfile: new FormControl(this.authService.getUser().profile.id),
            winnerProfile: new FormControl(this.competitionTO ? this.competitionTO.winnerProfile : null),
            creationDate: new FormControl(this.competitionTO ? this.competitionTO.creationDate : null)
        });
    }

    createLiterary() {
        Util.loadingScreen();
        this.competitionService.save(this.formCreateLiterary.value)
            .pipe(take(1))
            .subscribe(() => {
                    this.router.navigateByUrl('literary-competition');
                },
                error => {
                    Util.stopLoading();
                    console.log(error);
                });

    }

    editLiterary() {
        Util.loadingScreen();
        this.competitionService
            .update(this.formCreateLiterary.value)
            .pipe(take(1))
            .subscribe(result => {
                    this.router.navigateByUrl('literary-competition/' + result.id);
                },
                error => {
                    console.log(error);
                });
    }

    getById(id: string) {
        this.competitionService.getById(id)
            .pipe(take(1))
            .subscribe(result => {
                this.competitionTO = result;
                this.createForm();
            }, error => {
                console.log(error);
            });
    }

}
