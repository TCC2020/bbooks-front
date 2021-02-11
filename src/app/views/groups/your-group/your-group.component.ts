import {Component, OnInit} from '@angular/core';
import {GroupTO} from '../../../models/GroupTO.model';
import {GroupService} from '../../../services/group.service';
import {AuthService} from '../../../services/auth.service';
import {GroupMembers} from '../../../models/GroupMembers.model';
import {GroupMemberService} from '../../../services/group-member.service';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-your-group',
    templateUrl: './your-group.component.html',
    styleUrls: ['./your-group.component.scss']
})
export class YourGroupComponent implements OnInit {
    loading = false;
    page = 0;
    groups: GroupTO[] = [];

    constructor(
        private groupMemberService: GroupMemberService,
        private authService: AuthService,
        private translate: TranslateService,

    ) {
    }

    ngOnInit(): void {
        this.getGroupsByUser();
    }

    getGroupsByUser(): void {
        this.loading = true;
        this.groupMemberService.getGroupsByUser(this.authService.getUser().id)
            .pipe(take(1))
            .subscribe(result => {
                    this.groups = result;
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('your-group getGroupsByUser', error);
                });
    }

}
