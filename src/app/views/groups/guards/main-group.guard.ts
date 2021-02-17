import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {GroupService} from '../../../services/group.service';
import {Util} from '../../shared/Utils/util';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class MainGuardGroup implements CanActivate {
    constructor(
        private router: Router,
        private userService: GroupService,
        private translate: TranslateService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean  {
        const id = route.params.id;
        Util.loadingScreen();
        return this.userService.getById(id).pipe(
            take(1),
            map((res) => {
                Util.stopLoading();
                if (res?.id.includes(id)) {
                    return true;
                }
                this.router.navigate(['/']);
                return false;
            }),
            catchError((error) => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('Erro main group guard', error);
                this.router.navigate(['/pagenotfound']);
                return of(false);
            })
        );
    }
}
