import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupTO} from '../../../models/GroupTO.model';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {mapPostPrivacyStrinView} from '../../../models/enums/PostPrivacy.enum';
import {GroupMemberService} from '../../../services/group-member.service';
import {GroupMembers, Id} from '../../../models/GroupMembers.model';
import {AuthService} from '../../../services/auth.service';
import {Role} from '../../../models/enums/Role.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-reading-group',
    templateUrl: './reading-group.component.html',
    styleUrls: ['./reading-group.component.scss']
})
export class ReadingGroupComponent implements OnInit {
    links = ['feed', 'about', 'members', 'book-of-month'];
    activeLink = this.links[0];
    groupTO: GroupTO;
    role = Role;
    public mapPostPrivacy = mapPostPrivacyStrinView;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private groupMemberService: GroupMemberService,
        private authService: AuthService,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
        });
    }

    enterGroup(): void {
        const member = new GroupMembers();
        member.userId = this.authService.getUser().id;
        member.groupId = this.groupTO.id;

        member.role = this.role.member;
        Util.loadingScreen();
        this.groupMemberService.enterGroup(member)
            .pipe(take(1))
            .subscribe(() => {

            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error enter group', error);
            });
    }
}
