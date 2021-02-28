import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Book} from 'src/app/models/book.model';
import {BookRecommendationTO} from 'src/app/models/bookRecommendationTO.model';
import {Profile} from 'src/app/models/profileTO.model';
import {UserTO} from 'src/app/models/userTO.model';
import {AuthService} from 'src/app/services/auth.service';
import {BookRecommendationService} from 'src/app/services/book-recommendation.service';
import {GroupInviteTO} from '../../../models/GroupInviteTO.model';
import {GroupMemberService} from '../../../services/group-member.service';
import {take} from 'rxjs/operators';
import {Util} from '../Utils/util';
import {Friendship} from '../../../models/Friendship.model';
import {FriendsService} from '../../../services/friends.service';

@Component({
    selector: 'app-refer-book-dialog',
    templateUrl: './refer-book-dialog.component.html',
    styleUrls: ['./refer-book-dialog.component.scss']
})
export class ReferBookDialogComponent implements OnInit {


    pesquisarUsuarios;
    filterUsers: UserTO[];
    public Profile: Profile;
    public bookRecommendationTO = new BookRecommendationTO();
    public Book: Book;
    public formRecommendation: FormGroup;
    friendShip: Friendship;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, indicateMember: boolean, groupInviteTO: GroupInviteTO },
        public dialogRef: MatDialogRef<ReferBookDialogComponent>,
        private fb: FormBuilder,
        private bookRecommendationService: BookRecommendationService,
        private authService: AuthService,
        public translate: TranslateService,
        public groupMemberService: GroupMemberService,
        private friendsService: FriendsService
    ) {
        this.pesquisarUsuarios = this.fb.group({
            user: ['']
        });
    }

    ngOnInit(): void {
        this.getFriends();
        this.createForm();
        this.Book = this.data.book;
    }

    private createForm(): void {
        this.formRecommendation = this.fb.group({
            comment: new FormControl(null, Validators.required)
        });
    }

    pesquisar(nome): void {
        this.filterUsers = this.friendShip.friends.filter(user =>
            user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(nome.value.toLocaleLowerCase().replace(' ', '')));
    }

    referBook(profileReceivedId: number): void {
        this.bookRecommendationTO.profileSubmitter = this.authService.getUser().profile.id;
        this.bookRecommendationTO.profileReceived = profileReceivedId;
        this.Book.api === 'google' ?
            this.bookRecommendationTO.idBookGoogle = this.Book.id :
            // tslint:disable-next-line:radix
            this.bookRecommendationTO.idBook = Number.parseInt(this.Book.id);
        this.bookRecommendationTO.comentario = this.formRecommendation.get('comment').value;
        this.bookRecommendationService.save(this.bookRecommendationTO).subscribe(
            () => {
                this.translate.get('PADRAO.LIVRO_INDICADO').subscribe(text => {
                    alert(text);
                });
            },
            error => {
                console.log('BookRecommendation Error', error);
            }
        );
    }

    inviteToGroup(iduser: string): void {
        const sentRequest = this.data.groupInviteTO;
        sentRequest.userId = iduser;
        Util.loadingScreen();
        this.groupMemberService.invite(sentRequest)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.translate.get('GRUPO_LEITURA.CONVITE_ENVIADO').subscribe(message => {
                    Util.showSuccessDialog(message);
                    this.dialogRef.close();
                });
            }, error => {
                Util.stopLoading();
                this.verifyError(error, 'error inviter user group');
            });
    }

    verifyError(error: any, locationError: string): void {
        let codMessage = '';
        if (error.error.message.includes('GR006')) {
            codMessage = 'GR006';
        }
        if (codMessage) {
            this.translate.get('MESSAGE_ERROR.' + codMessage).subscribe(message => {
                Util.showErrorDialog(message);
            });
        } else {
            this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(msg => {
                Util.showErrorDialog(msg);
            });
            console.log(locationError + ': ', error);
        }
    }

    getFriends(): void {
        this.friendsService.getFriendsByUserName(this.authService.getUser().userName).subscribe(friendShip => {
            this.friendShip = friendShip;
        });
    }
}
