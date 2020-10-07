import {EventEmitter, Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SocialAuthService} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {UserTO} from '../models/userTO.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    api = environment.api + 'auth/';
    logged = new EventEmitter<boolean>();
    language = new EventEmitter<string>();

    userToRegister = new EventEmitter<UserTO>();

    constructor(
        private http: HttpClient,
        private authServiceSocial: SocialAuthService
    ) {
    }

    public authenticate(res, keepLogin: boolean) {
        if (keepLogin) {
            this.setToken(res['token']);
            this.setUser(res);
        } else {
            this.setSessionToken(res['token']);
            this.setSessionUser(res);
        }
        this.isLogged();
    }

    getByToken(token: string): Observable<UserTO> {
        return this.http.get<UserTO>(this.api + 'reset-pass/' + token);
    }
    resetPass(ResetPassTO: any): Observable<any> {
        return this.http.put(this.api + 'reset-pass/' , ResetPassTO);
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
    }

    public isLogged(): boolean {
        const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('user'));
        if (user !== null) {
            this.logged.emit(true);
            return true;
        } else {
            this.logged.emit(false);
            return false;
        }
    }

    public setToken(token) {
        localStorage.setItem('token', token);
    }

    public getUser(): any {
        return JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('user'));
    }


    public setUser(user): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public setSessionToken(token) {
        sessionStorage.setItem('token', token);
    }

    public setSessionUser(user) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    public getToken(): string {
        return localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
    }

    login(loginTO) {
        return this.http.post(this.api + 'login', loginTO);
    }

    loginToken(loginTO) {
        return this.http.post(this.api + 'login/token', loginTO);
    }

    saveByGoogle(userTO: UserTO) {
        return this.http.post(this.api + 'login/google', userTO);
    }

    sendResetPassEmail(dto) {
        return this.http.post(this.api + 'reset-pass', dto);
    }

    signInWithGoogle(): void {
        this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signOutGoogle(): void {
        this.authServiceSocial.signOut();
    }

    public setUserRegister(userTO) {
        this.setToken(userTO['token']);
        localStorage.setItem('userRegister', JSON.stringify(userTO));
    }

    public getUserRegister(): any {
        return JSON.parse(localStorage.getItem('userRegister'));
    }

}
