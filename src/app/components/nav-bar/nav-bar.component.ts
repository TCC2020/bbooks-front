import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {UserTO} from '../../models/userTO.model';
import {UserService} from '../../services/user.service';
import {take} from 'rxjs/operators';
import {FriendsService} from '../../services/friends.service';
import {FriendRequest} from '../../models/friendRequest.model';

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

    constructor(
        public auth: AuthService,
        private router: Router,
        public translate: TranslateService,
        private userService: UserService,
        private friendService: FriendsService
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

        if (this.isLogged) {
            setInterval(() => {
                this.friendService.getRequests().subscribe(requests => {
                    this.requests = requests;
                });
            }, 2000);
        }

    }

    getuser() {
        if (this.isLogged) {
            this.userService.getById(this.auth.getUser().id).pipe(
                take(1))
                .subscribe(user => {
                    this.user = user;
                });
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
}
