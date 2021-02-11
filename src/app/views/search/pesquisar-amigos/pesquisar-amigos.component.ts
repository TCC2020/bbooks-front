import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserTO} from 'src/app/models/userTO.model';
import {ProfileService} from 'src/app/services/profile.service';
import {UserService} from 'src/app/services/user.service';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-pesquisar-amigos',
    templateUrl: './pesquisar-amigos.component.html',
    styleUrls: ['./pesquisar-amigos.component.scss']
})
export class PesquisarAmigosComponent implements OnInit {

    pesquisarUsuarios;
    users: UserTO[];
    filterUsers: UserTO[];

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private profileService: ProfileService,
        public groupService: GroupService,
        private route: ActivatedRoute

    ) {
        this.pesquisarUsuarios = this.fb.group({
            user: ['']
        });
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                map(params => params.search)
            )
            .subscribe(params => {
                    console.log(params);
                }
            );
        this.getUsers();
    }

    /*pesquisar(nome) {
        this.filterUsers = this.users.filter(user => {
            if(user) {
                user.profile.name.concat(user.profile.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(nome.value.toLocaleLowerCase().replace(' ', ''));
            }
        })
    }*/


    pesquisar(nome) {
        this.filterUsers = this.users.filter(user =>
                user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(nome.value.toLocaleLowerCase().replace(' ', '')));
    }

    getUsers() {
        this.userService.getAllUsers().subscribe(response => {
            this.users = response;
        });
    }

}
