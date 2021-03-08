import {Component, OnInit} from '@angular/core';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {GroupTO} from '../../../models/GroupTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mapPostPrivacy, mapPostPrivacyStrinView, PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {TranslateService} from '@ngx-translate/core';
import {GroupMemberService} from '../../../services/group-member.service';
import {Role} from '../../../models/enums/Role.enum';
import {AuthService} from '../../../services/auth.service';
import {GroupMembers} from '../../../models/GroupMembers.model';
import Swal from 'sweetalert2';
import {zip} from 'rxjs';

@Component({
    selector: 'app-about-group',
    templateUrl: './about-group.component.html',
    styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {

    isEditing = false;
    description: any;
    groupTO: GroupTO;
    formGroup: FormGroup;
    isAdmin = false;
    member: GroupMembers;
    public mapPostPrivacy = mapPostPrivacy;
    public mapPostPrivacyView = mapPostPrivacyStrinView;

    public privacy = PostPrivacy;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private groupMemberService: GroupMemberService,
        private authService: AuthService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            this.verifyUserIsAdm();
            this.createForm();
        });
    }

    private createForm(): void {
        this.formGroup = this.formBuilder.group({
            id: new FormControl(this.groupTO?.id, Validators.required),
            name: new FormControl(this.groupTO?.name, Validators.required),
            description: new FormControl(this.groupTO?.description),
            privacy: new FormControl(this.groupTO?.privacy, Validators.required),
            userId: new FormControl(this.groupTO?.userId),
            creationDate: new FormControl(this.groupTO?.creationDate),
        });
    }

    changeToEdit(): void {
        this.isEditing = !this.isEditing;
    }

    update(): void {
        Util.loadingScreen();
        this.changeToEdit();
        this.groupService.update(this.formGroup.value)
            .pipe(take(1))
            .subscribe(result => {
                    Util.stopLoading();
                    this.groupTO = result;
                },
                error => {
                    Util.stopLoading();
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('erro update group service', error);
                });
    }

    verifyUserIsAdm(): void {
        Util.loadingScreen();
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(
                take(1)
            ).subscribe(result => {
            Util.stopLoading();
            const member = result.find(m => m.user.id === this.authService.getUser().id);
            this.member = member;
            if (member) {
                if (member.role === Role.owner || member.role === Role.admin) {
                    this.isAdmin = true;
                }
            }
        }, error => {
            Util.stopLoading();
            this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                Util.showErrorDialog(message);
            });
            console.log('Erro: members-group getMembers', error);
        });
    }

    exitDilaogConfirm(sair?: string): void {
        zip(
            this.translate.get('GRUPO_LEITURA.VOCE_QUER_SAIR'),
            this.translate.get('GRUPO_LEITURA.VOCE_QUER_DELETAR'),
            this.translate.get('PADRAO.NAO'),
            this.translate.get('PADRAO.SIM')
        ).subscribe(messages => {
            // @ts-ignore
            Swal.fire({
                icon: 'warning',
                text: sair ? messages[0] : messages[1],
                showConfirmButton: true,
                confirmButtonText: messages[3],
                showCancelButton: true,
                cancelButtonText: messages[2]
            }).then((result) => {
                if (result.value) {
                    sair ? this.exitGroup() : this.deleteGroup();
                }
            });
        });
    }

    exitGroup(): void {
        Util.loadingScreen();
        const member = new GroupMembers();
        member.role = this.member.role;
        member.userId = this.member.user.id;
        member.groupId = this.member.groupId;
        member.date = this.member.date;
        member.status = this.member.status;
        this.groupMemberService.exitGroup(member)
            .pipe(take(1))
            .subscribe(() => {
                    Util.stopLoading();
                    this.translate.get('GRUPO_LEITURA.VOCE_SAIU').subscribe(msg => {
                        Util.showSuccessDialog(msg);
                    });
                    this.router.navigateByUrl('/group/' + member.groupId);
                },
                error => {
                    console.log('error exit group member', error);
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(msg => {
                        Util.showErrorDialog(msg);
                    });
                    Util.stopLoading();
                });
    }

    deleteGroup(): void {
        Util.loadingScreen();
        this.groupService.delete(this.groupTO.id)
            .pipe(take(1))
            .subscribe(() => {
                    Util.stopLoading();
                    this.translate.get('GRUPO_LEITURA.EXCLUIDO').subscribe(msg => {
                        Util.showSuccessDialog(msg);
                    });
                    this.router.navigateByUrl('/groups-search');
                },
                error => {
                    console.log('error exit group member', error);
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(msg => {
                        Util.showErrorDialog(msg);
                    });
                    Util.stopLoading();
                });
    }

}
