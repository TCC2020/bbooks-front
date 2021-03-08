import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {UserTO} from '../../models/userTO.model';
import {UserService} from '../../services/user.service';
import {map, take} from 'rxjs/operators';
import {FriendsService} from '../../services/friends.service';
import {FriendRequest} from '../../models/friendRequest.model';
import {Friend} from '../../models/friend.model';
import {BookRecommendationService} from 'src/app/services/book-recommendation.service';
import {BookRecommendationTO} from 'src/app/models/bookRecommendationTO.model';
import {ProfileService} from 'src/app/services/profile.service';
import {BookService} from 'src/app/services/book.service';
import {GoogleBooksService} from 'src/app/services/google-books.service';
import {GroupMemberService} from '../../services/group-member.service';
import {GroupInviteTO} from '../../models/GroupInviteTO.model';
import {Util} from '../../views/shared/Utils/util';
import {PublicProfileService} from '../../services/public-profile.service';
import {UserPublicProfileTO} from '../../models/UserPublicProfileTO.model';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    isLogged: boolean;
    user: UserTO;
    menuPerfil;
    requests: FriendRequest[];
    recommendations: BookRecommendationTO[];
    invitesGroup: GroupInviteTO[];
    publicProfileTO: UserPublicProfileTO;
    publicProfileId = '';

    constructor(
        public auth: AuthService,
        private router: Router,
        public translate: TranslateService,
        private userService: UserService,
        private friendService: FriendsService,
        private bookRecommendation: BookRecommendationService,
        private profileService: ProfileService,
        private bookService: BookService,
        private gBookService: GoogleBooksService,
        public groupMembersService: GroupMemberService,
        private publicProfileService: PublicProfileService
    ) {
        translate.addLangs(['pt-BR', 'en']);
        translate.setDefaultLang('pt-BR');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/pt-BR|en/) ? browserLang : 'pt-BR');
    }

    ngOnInit(): void {
        this.isLogged = this.auth.isLogged();
        this.auth.logged.subscribe(eventLogged => {
            this.isLogged = eventLogged;
            this.getuser();
        });
        this.getuser();
        this.refreshRequest();
        this.getRecommendations();
        this.getInvitesGroup();
        this.getPublicProfileByUser();
    }

    refreshRequest() {
        setInterval(() => {
            this.getRequests();
        }, 2000);
    }

    getRequests() {
        if (this.isLogged) {
            this.friendService.getRequests().subscribe(requests => {
                    this.requests = requests;
                },
                error => {
                    console.log('error getRequests', error);
                });
        }
    }

    verifyRequests() {
        const result = this.requests?.filter(request => request.status === 'received');
        if (result?.length > 0 || this.invitesGroup?.length > 0) {
            return result.length + this.invitesGroup.length;
        } else {
            return '';
        }
    }

    getuser() {
        if (this.isLogged) {
            this.userService.getById(this.auth.getUser().id).pipe(
                take(1))
                .subscribe(user => {
                    this.user = user;
                });
            this.getRequests();
        }

    }

    switchLang(lang: string): void {
        this.translate.use(lang);
        this.auth.language.emit(lang);
    }

    logout() {
        this.auth.logout();
        document.location.reload();
        this.router.navigate(['']);
    }

    aceptRequest(request: FriendRequest) {
        const acept = new Friend();
        acept.id = request.id;
        Util.stopLoading();
        this.friendService.acceptRequest(acept).subscribe(() => {
            Util.stopLoading();
            this.translate.get('PADRAO.SOLICITACAO_ACEITA').subscribe(message => {
                Util.showSuccessDialog(message);
            });
        });

    }

    deleteRequest(request: FriendRequest) {
        const acept = new Friend();
        acept.id = request.id;
        Util.stopLoading();
        this.friendService.deleteRequest(acept).subscribe(() => {
            Util.stopLoading();
            if (request.status === 'sent') {
                this.translate.get('PADRAO.SOLICITACAO_CANCELADA').subscribe(message => {
                    Util.showSuccessDialog(message);
                });
            } else {
                this.translate.get('PADRAO.SOLICITACAO_N_ACEITA').subscribe(message => {
                    Util.showSuccessDialog(message);
                });
            }

        });
    }

    requestsSent(): FriendRequest[] {
        return this.requests?.filter(r => r.status === 'sent');
    }

    requestsReceived(): FriendRequest[] {
        return this.requests?.filter(r => r.status === 'received');
    }

    getRecommendations(): void {
        this.bookRecommendation.getRecommentionsReceived(this.auth.getUser().profile.id)
            .pipe(
                map((recommendations: BookRecommendationTO[]) => {
                    return recommendations.map(r => {
                        r.profileTO = this.profileService.getById(r.profileSubmitter);
                        r.book = r.idBook ?
                            this.bookService.getById(r.idBook) :
                            this.gBookService.getById(r.idBookGoogle).pipe(map(b => this.bookService.convertBookToModel(b)));
                        return r;
                    });
                })
            )
            .subscribe(recommendations => {
                this.recommendations = recommendations;
            }, error => {
                console.log('Erro getRecommendation ', error);
            });
    }

    routerRecommendation(idGoogleBook: string): any {
        return idGoogleBook ? {api: 'google'} : {};
    }

    getInvitesGroup(): void {
        this.groupMembersService.getInvites(this.auth.getUser().id)
            .pipe(
                take(1),
                map(invites => {
                    return invites.map(i => {
                        i.inviterUser = this.userService.getById(i.inviter);
                        return i;
                    });
                })
            ).subscribe(result => {
                this.invitesGroup = result;
        });

    }

    acceptInviteGroup(id: string): void {
        Util.loadingScreen();
        this.groupMembersService.acceptInvite(id)
            .pipe(take(1))
            .subscribe(() => {
                Util.stopLoading();
                this.translate.get('NAV.CONVITE_ACEITO').subscribe(message => {
                    Util.showSuccessDialog(message);
                });
                this.invitesGroup = this.invitesGroup.filter(i => i.id !== id);
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error accpet invite group', error);
            });
    }

    refuseInviteGroup(id: string): void {
        Util.loadingScreen();
        this.groupMembersService.refuseInvite(id)
            .pipe(take(1))
            .subscribe(() => {
                Util.stopLoading();
                this.translate.get('NAV.CONVITE_RECUSADO').subscribe(message => {
                    Util.showSuccessDialog(message);
                });
                this.invitesGroup = this.invitesGroup.filter(i => i.id !== id);
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error refuse invite group', error);
            });
    }

    getPublicProfileByUser() {
        this.publicProfileService.getByUserId(this.auth.getUser().id)
            .pipe(take(1))
            .subscribe(result => {
                this.publicProfileTO = result;
                this.publicProfileId = result.id;
            });
    }
}
