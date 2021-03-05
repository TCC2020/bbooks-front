import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Friendship} from '../../../models/Friendship.model';
import {FriendsService} from '../../../services/friends.service';
import {AuthService} from '../../../services/auth.service';
import {Friend} from '../../../models/friend.model';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Util } from '../../shared/Utils/util';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
    search: string;
    user: UserTO = new UserTO();
    friendShip: Friendship;
    friendTO: Friend = new Friend();
    public formSearch: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private friendsService: FriendsService,
        private router: Router,
        public authService: AuthService,
        public translate: TranslateService,
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {
        this.formSearch = this.formBuilder.group({
            search: new FormControl(null)
        });
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });

        this.getFriends();
    }

    getFriends() {
        this.friendsService.getFriendsByUserName(this.user.userName).subscribe(friendShip => {
            this.friendShip = friendShip;
        });
    }

    ngOnInit(): void {
    }

    getUser() {
        this.userService.getUserName(this.user.userName, this.authService.getToken()).pipe(take(1)).subscribe(user => {
            this.user = user;
        });
    }

    redirect(username) {
        this.router.navigate(['', username])
            .then(() => {
                window.location.reload();
            });
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
        this.friendTO.id = this.user.profile.id;
        Util.loadingScreen();
        this.friendsService.add(this.friendTO).subscribe(() => {
                Util.stopLoading();
                this.translate.get('PADRAO.SOLICITACAO_ENVIADA').subscribe(message => {
                    Util.showSuccessDialog(message);
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
            Util.loadingScreen();
            this.friendsService.deleteRequest(acept).subscribe(() => {
                this.translate.get('PADRAO.SOLICITACAO_N_ACEITA').subscribe(message => {
                    Util.showSuccessDialog(message);
                    this.getFriends();
                });
            });
        });
    }

    aceptRequest(username: string) {
        this.friendsService.getRequestByUserName(username).subscribe(request => {
            const acept = new Friend();
            acept.id = request.id;
            Util.loadingScreen();
            this.friendsService.acceptRequest(acept).subscribe(() => {
                this.translate.get('PADRAO.SOLICITACAO_ACEITA').subscribe(message => {
                    Util.showSuccessDialog(message);
                    this.getFriends();
                });
            });
        });
    }

    deleteFriend(idProfile: number) {
        this.friendsService.deleteFriend(idProfile).subscribe(() => {
                this.getFriends();
            },
            error => {
                console.log(error);
            });
    }

    filterFriends(): UserTO[] {
        let search = this.formSearch.get('search').value;
        if (search) {
            search = search.toLowerCase();
            return this.friendShip?.friends.filter(m =>
                m.profile.name.includes(search) ||
                m.profile.lastName.toLowerCase().includes(search) ||
                m.userName.toLowerCase().includes(search)
            );
        }
        return this.friendShip?.friends;
    }

}
