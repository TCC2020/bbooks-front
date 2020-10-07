import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Friendship} from '../../../models/Friendship.model';
import {FriendsService} from '../../../services/friends.service';
import {AuthService} from '../../../services/auth.service';
import {Friend} from '../../../models/friend.model';

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

    constructor(
        private route: ActivatedRoute,
        private friendsService: FriendsService,
        private router: Router,
        private authService: AuthService

    ) {
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
        this.friendTO.id = Number.parseInt(this.user.profile.id);
        this.friendsService.add(this.friendTO).subscribe(() => {
                alert('pedido enviado!');
                this.user.profile.friendshipStatus = 'pending';
            },
            error => {
                console.log(error);
            });
    }

}
