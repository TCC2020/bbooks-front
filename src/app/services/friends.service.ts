import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../models/friend.model';
import {FriendRequest} from '../models/friendRequest.model';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    api: string = environment.api + 'friends/';

    constructor(
        private http: HttpClient
    ) {
    }

    add(friendTO: Friend): Observable<any> {
        return this.http.post(this.api + 'requests', friendTO);
    }

    getRequests(): Observable<FriendRequest[]> {
        return this.http.get<FriendRequest[]>(this.api + 'requests');
    }
}
