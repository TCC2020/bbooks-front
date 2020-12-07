import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';


@Injectable()
export class FeedResolve implements Resolve<UserTO> {

    constructor(
        private userService: UserService,
        private authService: AuthService

    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const username = route.parent.params.username;
        return this.userService.getUserName(username, this.authService.getToken())
            .pipe(
                map(user => user)
            );
    }
}