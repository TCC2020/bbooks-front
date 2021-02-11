import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {catchError, map, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
        private authService: AuthService

    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean  {
        const username = route.params.username;
        return this.userService.getUserName(username, this.authService.getToken()).pipe(
            map((res) => {
                if (res?.userName.includes(username)) {
                    return true;
                }
                this.router.navigate(['/']);
                return false;
            }),
            catchError(() => {
                this.router.navigate(['/pagenotfound']);
                return of(false);
            })
        );
    }
}
