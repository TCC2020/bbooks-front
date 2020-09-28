import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../../models/userTO.model';
import {take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    links = ['feed', 'bookcase', 'friend'];
    activeLink = this.links[0];
    user: UserTO;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UserService
    ) {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });
    }

    ngOnInit(): void {
        this.changeMenu();
    }

    changeMenu(): void {
        const result = this.links.find(l => this.router.url.toLowerCase().includes(l.toLowerCase()));
        if (result) {
            this.activeLink = result;
            this.router.navigate([`${this.user.userName}/${result.toString()}`]);
        } else {
            this.activeLink = this.links[0];
            this.router.navigate([`${this.user.userName}/${this.links[0].toString()}`]);
        }
    }

    verfiyPerfilPageisUserLogged() {
        return this.authService.getUser().id === this.user.id;
    }

}
