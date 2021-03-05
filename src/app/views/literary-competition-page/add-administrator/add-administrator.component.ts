import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {map, take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {ActivatedRoute} from '@angular/router';
import {CompetitionMemberService} from '../../../services/competition-member.service';
import {CompetitionMemberTO} from '../../../models/competitionMemberTO.model';
import {LiteraryMemberStatus} from '../../../models/enums/LiteraryMemberStatus.enum';
import {Role} from '../../../models/enums/Role.enum';
import {CompetitionMemberSaveTO} from '../../../models/competitionMemberSaveTO.model';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-add-administrator',
    templateUrl: './add-administrator.component.html',
    styleUrls: ['./add-administrator.component.scss']
})
export class AddAdministratorComponent implements OnInit {

    formSearch: FormGroup;
    users: UserTO[];
    filterUsers: UserTO[] = [];
    literaryCompetitionId: string;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private competitionMemberService: CompetitionMemberService
    ) {
        this.formSearch = formBuilder.group({
            search: ['']
        });
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.literaryCompetitionId = result;
                    this.getAllUsers();
                }
            );
        this.getAllUsers();

    }

    getAllUsers() {
        this.userService.getAllUsers()
            .pipe(take(1))
            .subscribe(result => {
                this.users = result;
                console.log(this.users);
            });
    }


    searchAdmins() {
        const formSearch = this.formSearch.get('search').value;
        this.filterUsers = this.users.filter(user =>
            user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(formSearch.toLocaleLowerCase().replace(' ', '')));
        console.log(this.filterUsers);

    }

    addAdmin(id: number) {
        Util.loadingScreen();
        const competitionMemberSaveTO = new CompetitionMemberSaveTO();
        competitionMemberSaveTO.title = null;
        competitionMemberSaveTO.story = null;
        competitionMemberSaveTO.profileId = id;
        competitionMemberSaveTO.role = Role.admin;
        competitionMemberSaveTO.status = LiteraryMemberStatus.accept;
        competitionMemberSaveTO.competitionId = this.literaryCompetitionId;

        this.competitionMemberService.saveMember(competitionMemberSaveTO)
            .pipe(take(1))
            .subscribe(() => {
                Util.stopLoading();
            }, error => {
                Util.stopLoading();
                console.log(error);
            });
    }

}
