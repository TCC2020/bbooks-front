import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {BnNgIdleService} from 'bn-ng-idle';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Util } from './views/shared/Utils/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bbooks';

  constructor(
      public auth: AuthService,
      private idleService: BnNgIdleService,
      private router: Router,
      private translate: TranslateService

  ) {
  }

  ngOnInit(): void {
    // this.idleService.startWatching(600)
    //     .subscribe((isUserInactive) => {
    //       if (isUserInactive) {
    //         if ( this.auth.getUser() !== null) {
    //           this.translate.get('PADRAO.SESSAO_EXPIRADA').subscribe(message => {
    //             Util.showErrorDialog(message);
    //           });
    //           this.auth.logout();
    //           this.router.navigateByUrl('/login');
    //           this.idleService.resetTimer();
    //         }
    //       }
    //     });
  }

}
