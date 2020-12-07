import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../../models/userTO.model';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {FriendsService} from '../../../services/friends.service';
import {Friend} from '../../../models/friend.model';
import {UserService} from '../../../services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnChanges {
    links = ['feed', 'bookcase', 'friends'];
    activeLink = this.links[0];
    user: UserTO = new UserTO();
    friendTO: Friend = new Friend();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private friendsService: FriendsService,
        private userService: UserService,
        public translate: TranslateService,
    ) {
        this.route.data.subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });
    }

    ngOnInit(): void {
        this.changeMenu();
    }

    ngOnChanges() {
        this.changeMenu();
        this.getUser();
    }
    getUser() {
        this.userService.getUserName(this.user.userName, this.authService.getToken()).subscribe((result) => {
            this.user = result;
        });
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
        this.friendsService.add(this.friendTO).subscribe(() => {
                this.translate.get('PADRAO.SOLICITACAO_ENVIADA').subscribe(message => {
                    alert(message);
                });
                this.user.profile.friendshipStatus = 'sent';
            },
            error => {
                console.log(error);
            });
    }

    deleteRequest(username: string) {
        this.friendsService.getRequestByUserName(username).subscribe(request => {
            const acept = new Friend();
            acept.id = request.id;
            this.friendsService.deleteRequest(acept).subscribe(() => {
                this.translate.get('PADRAO.SOLICITACAO_N_ACEITA').subscribe(message => {
                    alert(message);
                    this.getUser();
                });
            });
        });
    }

    aceptRequest(username: string) {
        this.friendsService.getRequestByUserName(username).subscribe(request => {
            const acept = new Friend();
            acept.id = request.id;
            this.friendsService.acceptRequest(acept).subscribe(() => {
                this.translate.get('PADRAO.SOLICITACAO_ACEITA').subscribe(message => {
                    alert(message);
                    this.getUser();
                });
            });
        });
    }

    deleteFriend(idProfile: string) {
        this.friendsService.deleteFriend(Number.parseInt(idProfile)).subscribe(() => {
                this.getUser();
            },
            error => {
                console.log(error);
            });
    }

}
