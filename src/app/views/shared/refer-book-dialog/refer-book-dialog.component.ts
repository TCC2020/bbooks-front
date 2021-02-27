import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Book} from 'src/app/models/book.model';
import {BookRecommendationTO} from 'src/app/models/bookRecommendationTO.model';
import {Profile} from 'src/app/models/profileTO.model';
import {UserTO} from 'src/app/models/userTO.model';
import {AuthService} from 'src/app/services/auth.service';
import {BookRecommendationService} from 'src/app/services/book-recommendation.service';
import {UserService} from 'src/app/services/user.service';
import {GroupTO} from '../../../models/GroupTO.model';
import {GroupInviteTO} from '../../../models/GroupInviteTO.model';
import {MembersGroupResolve} from '../../groups/guards/members-group.resolve';
import {GroupMemberService} from '../../../services/group-member.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-refer-book-dialog',
    templateUrl: './refer-book-dialog.component.html',
    styleUrls: ['./refer-book-dialog.component.scss']
})
export class ReferBookDialogComponent implements OnInit {


    pesquisarUsuarios;
    users: UserTO[];
    filterUsers: UserTO[];
    public Profile: Profile;
    public bookRecommendationTO = new BookRecommendationTO();
    public Book: Book;
    public formRecommendation: FormGroup;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, indicateMember: boolean, groupInviteTO: GroupInviteTO },
        private fb: FormBuilder,
        private userService: UserService,
        private bookRecommendationService: BookRecommendationService,
        private authService: AuthService,
        public translate: TranslateService,
        public groupMemberService: GroupMemberService
    ) {
        this.pesquisarUsuarios = this.fb.group({
            user: ['']
        });
    }

    ngOnInit(): void {
        this.getUsers();
        this.createForm();
        this.Book = this.data.book;
    }

    private createForm(): void {
        this.formRecommendation = this.fb.group({
            comment: new FormControl(null, Validators.required)
        });
    }

    pesquisar(nome): void {
        this.filterUsers = this.users.filter(user =>
            user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
                .includes(nome.value.toLocaleLowerCase().replace(' ', '')));
    }

    getUsers(): void {
        this.userService.getAllUsers().subscribe(response => {
            this.users = response;
        });
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
        const sentRequest = this.data.groupInviteTO.group;
        sentRequest.userId = iduser;
        this.groupMemberService.invite(sentRequest)
            .pipe(take(1))
            .subscribe(r => {
                console.log(r);
            }, error => {
                console.log('error inviter user group', error);
            });
    }
}
