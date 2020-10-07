import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../models/friend.model';
import {FriendRequest} from '../models/friendRequest.model';
import {Accept} from '../models/acept.model';
import {Friendship} from '../models/Friendship.model';

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

    acceptRequest(AcceptTO: Accept): Observable<any> {
        return this.http.put(this.api + 'requests', AcceptTO);
    }
    deleteRequest(AcceptTO: Accept): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: AcceptTO
        };
        return this.http.delete(this.api + 'requests', options);
    }

    getFriends(): Observable<Friendship> {
        return this.http.get<Friendship>(this.api);
    }
    getFriendsByUserName(username: string): Observable<Friendship> {
        return this.http.get<Friendship>(this.api + username);
    }
}
