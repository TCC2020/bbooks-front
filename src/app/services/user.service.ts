import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AuthGuard} from '../guards/auth-guard';
import {UserTO} from '../models/userTO.model';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    api: string = environment.api + 'users/';

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    updateUserInfo() {
        this.http.get(this.api + 'info/').subscribe(response => {
            this.auth.setUser(response);
        });
    }

    verifyEmail(email: string) {
        return this.http.get(this.api + 'email/' + email);
    }
    verifyEmailForSocialLogin(email: string) {
        return this.http.get(this.api + 'google/' + email);
    }

    getById(id: string): Observable<UserTO> {
        return this.http.get<UserTO>(this.api + id);
    }
    getUserName(username: string, userToken: string): Observable<UserTO> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                 Authorization: userToken
            })};
        return this.http.get<UserTO>(this.api + 'username/' + username, httpOptions);
    }
    update(userTo: UserTO) {
        return this.http.put<UserTO>(this.api + userTo.id, userTo);
    }

    getAllUsers() {
        return this.http.get<UserTO[]>(this.api);
    }
}
