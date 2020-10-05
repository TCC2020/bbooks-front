import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../../models/userTO.model';
import {take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {FriendsService} from '../../../services/friends.service';
import {Friend} from '../../../models/friend.model';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    links = ['feed', 'bookcase', 'friends'];
    activeLink = this.links[0];
    user: UserTO;
    friendTO: Friend;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private friendsService: FriendsService
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
        if (this.authService.getUser()?.id) {
            return this.authService.getUser().id === this.user.id;
        } else {
            return false;
        }
    }

    sendRequest() {
        this.friendTO = new Friend();
        this.friendTO.id = Number.parseInt(this.user.profile.id);
        console.log(this.friendTO)
        this.friendsService.add(this.friendTO, this.authService.getUser().token).subscribe(() => {
                alert('pedido enviado!');
            },
            error => {
                console.log(error);
            });
    }

}
