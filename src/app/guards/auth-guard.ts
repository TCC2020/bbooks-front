import { Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        this.authService.isLogged();
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null'
            || sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'null'
        ) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
