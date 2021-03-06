import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupTO} from '../../../models/GroupTO.model';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {mapPostPrivacyStrinView, PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {GroupMemberService} from '../../../services/group-member.service';
import {GroupMembers} from '../../../models/GroupMembers.model';
import {AuthService} from '../../../services/auth.service';
import {Role} from '../../../models/enums/Role.enum';
import {TranslateService} from '@ngx-translate/core';
import {ReferBookDialogComponent} from '../../shared/refer-book-dialog/refer-book-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GroupInviteTO} from '../../../models/GroupInviteTO.model';
import {GroupService} from '../../../services/group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-reading-group',
    templateUrl: './reading-group.component.html',
    styleUrls: ['./reading-group.component.scss']
})
export class ReadingGroupComponent implements OnInit {
    links = ['feed', 'about', 'members', 'book-of-month'];
    groupTO: GroupTO;
    role = Role;
    public mapPostPrivacy = mapPostPrivacyStrinView;
    isAdmin = false;
    isMember = false;
    isEditing = false;
    formGroup: FormGroup;
    members: GroupMembers[] = [];

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private groupMemberService: GroupMemberService,
        private authService: AuthService,
        private translate: TranslateService,
        public dialog: MatDialog,
        private groupService: GroupService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            this.verifyUserIsAdm();
        });
        this.createForm();
        this.getMembers();
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            id: new FormControl(this.groupTO ? this.groupTO.id : null),
            userId: new FormControl(this.groupTO ? this.groupTO.userId : null),
            name: new FormControl(this.groupTO ? this.groupTO.name : null, Validators.required),
            description: new FormControl(this.groupTO ? this.groupTO.description : null),
            privacy: new FormControl(this.groupTO ? this.groupTO.privacy : null),
            creationDate: new FormControl(this.groupTO ? this.groupTO.creationDate : null)
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
                this.isMember = true;
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error enter group', error);
            });
    }

    verifyUserIsAdm(): void {
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(
                take(1)
            ).subscribe(result => {
            Util.stopLoading();
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

    openDialogReferBook() {
        const groupInviteTO = new GroupInviteTO();
        groupInviteTO.group = this.groupTO;
        groupInviteTO.groupId = this.groupTO.id;
        groupInviteTO.inviter = this.authService.getUser().id;

        const dialogRef = this.dialog.open(ReferBookDialogComponent, {
            height: '580px',
            width: '680px',
            data: {
                indicateMember: true,
                groupInviteTO
            }
        });
        dialogRef.afterClosed().subscribe(() => {

        });
    }

    hasFeedRouter(): boolean {
        return this.router.url.includes('feed');
    }

    changeToEdit(): void {
        this.isEditing = !this.isEditing;
    }

    update() {
        this.changeToEdit();
        this.groupService.update(this.formGroup.value)
            .pipe(take(1))
            .subscribe(result => {
                Util.showSuccessDialog('Nome alterado com sucesso!');
            }, error => {
                console.log(error);
            });
    }

    getMembers() {
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(take(1))
            .subscribe(result => {
                this.members = result;
            }, error => {
                console.log(error);
            });
    }
}
