import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';


@Injectable()
export class MainResolve implements Resolve<UserTO> {

    isUser: boolean;

    constructor(
        private userService: UserService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const username = route.params.username;
        return this.userService.getUserName(username).pipe(take(1), map(user => user));
    }

}
