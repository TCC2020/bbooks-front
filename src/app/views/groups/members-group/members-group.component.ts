import {Component, OnInit} from '@angular/core';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {GroupTO} from '../../../models/GroupTO.model';
import {ActivatedRoute} from '@angular/router';
import {GroupMemberService} from '../../../services/group-member.service';
import {GroupMembers} from '../../../models/GroupMembers.model';
import {UserService} from '../../../services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {Role} from '../../../models/enums/Role.enum';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-members-group',
    templateUrl: './members-group.component.html',
    styleUrls: ['./members-group.component.scss']
})
export class MembersGroupComponent implements OnInit {
    groupTO: GroupTO;
    members: GroupMembers[];
    isAdmin = false;
    isMember = false;
    constructor(
        private route: ActivatedRoute,
        private groupMemberService: GroupMemberService,
        private userService: UserService,
        private translate: TranslateService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            this.getMembers();
        });
    }

    getMembers(): void {
        Util.loadingScreen();
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(
                take(1)
            ).subscribe(result => {
            Util.stopLoading();
            this.members = result;
            const member = result.find(m => m.user.id === this.authService.getUser().id);
            if (member) {
                if (member.role === Role.owner || member.role === Role.admin) {
                    this.isAdmin = true;
                }
                this.isMember = true;
            }
        }, error => {
            Util.stopLoading();
            this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                Util.showErrorDialog(message);
            });
            console.log('Erro: members-group getMembers', error);
        });
    }
}
