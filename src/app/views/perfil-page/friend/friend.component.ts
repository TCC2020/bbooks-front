import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {ActivatedRoute} from '@angular/router';
import {Friendship} from '../../../models/Friendship.model';
import {FriendsService} from '../../../services/friends.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
    search: string;
    user: UserTO = new UserTO();
    friendShip: Friendship;
    constructor(
        private route: ActivatedRoute,
        private friendsService: FriendsService
    ) {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });

        this.getFriends();
    }

    getFriends() {

        this.friendsService.getFriends().subscribe(friendShip => {
            this.friendShip = friendShip;
        });


    }

    ngOnInit(): void {
    }

}
