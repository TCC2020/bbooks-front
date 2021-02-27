import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitionTO} from '../../../models/competitionTO.model';

@Component({
    selector: 'app-literary-competition',
    templateUrl: './literary-competition.component.html',
    styleUrls: ['./literary-competition.component.scss']
})
export class LiteraryCompetitionComponent implements OnInit {

    isEditing = false;
    dateStart = new FormControl(new Date('2021-02-14'));
    dateEnd = new FormControl(new Date('2021-02-24'));
    dateEndCompetition = new FormControl(new Date('2021-03-31'));
    competitionTO: CompetitionTO;

    constructor(
        private route: ActivatedRoute,
        private competitionService: CompetitionService
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.getById(result);
                }
            );
    }


    isUserAdministrator(): boolean {
        return true;
    }

    edit(): void {
        this.isEditing = !this.isEditing;
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

}
