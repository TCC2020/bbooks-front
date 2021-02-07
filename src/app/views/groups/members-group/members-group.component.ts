import {Component, OnInit} from '@angular/core';
import {Util} from '../../shared/Utils/util';
import {map, take} from 'rxjs/operators';
import {GroupTO} from '../../../models/GroupTO.model';
import {ActivatedRoute} from '@angular/router';
import {GroupMemberService} from '../../../services/group-member.service';
import {GroupMembers} from '../../../models/GroupMembers.model';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-members-group',
    templateUrl: './members-group.component.html',
    styleUrls: ['./members-group.component.scss']
})
export class MembersGroupComponent implements OnInit {
    groupTO: GroupTO;
    members: GroupMembers[];

    constructor(
        private route: ActivatedRoute,
        private groupMemberService: GroupMemberService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            this.getMenbers();
        });
    }

    getMenbers(): void {
        Util.loadingScreen();
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(
                take(1)
            ).subscribe(result => {
            Util.stopLoading();

            this.members = result;
            this.getUserMember();
        });
    }

    isAdm(): boolean {
        return true;
    }

    getUserMember(): void {
        Util.loadingScreen();
        this.members.map((result, i) => {
            this.userService.getById(result.id.user)
                .pipe(take(1))
                .subscribe(user => {
                    this.members[i].userTO = user;
                });
        });
        Util.stopLoading();
    }
}
