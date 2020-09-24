import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogged: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    public translate: TranslateService
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
    });
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.auth.language.emit(lang);
  }

  logout() {
    this.auth.logout();
    document.location.reload();
    this.router.navigateByUrl('/');
  }
}
