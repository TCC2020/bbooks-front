import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean  {
        const username = route.params.username;
        return this.userService.getUserName(username).pipe(
            take(1),
            map((res) => {
                if (res?.userName.includes(username)) {
                    return true;
                }
                this.router.navigate(['/']);
                return false;
            }),
        );
    }
}
