import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserTO} from 'src/app/models/userTO.model';
import {ProfileService} from 'src/app/services/profile.service';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'app-pesquisar-amigos',
    templateUrl: './pesquisar-amigos.component.html',
    styleUrls: ['./pesquisar-amigos.component.scss']
})
export class PesquisarAmigosComponent implements OnInit {

    users: UserTO[];
    filterUsers: UserTO[] = [];

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(params => {
                if (params) {
                    this.userService.getAllUsers()
                        .pipe(
                            take(1),
                            map(users => {
                                return users.filter(user =>
                                    user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                                        .includes(params.toLocaleLowerCase().replace(' ', '')));
                            })
                        ).subscribe(users => {
                        this.filterUsers = users;
                    });
                } else {
                    this.filterUsers = [];
                }
            });
    }
}
