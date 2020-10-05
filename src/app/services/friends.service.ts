import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../models/friend.model';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    api: string = environment.api + 'friends/';

    constructor(
        private http: HttpClient
    ) {
    }

    add(friendTO: Friend, tokenSend: string): Observable<any> {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            AUTHORIZATION: tokenSend });
        const options = { headers: header };

        return this.http.post(this.api + 'requests', friendTO, options);
    }
}
