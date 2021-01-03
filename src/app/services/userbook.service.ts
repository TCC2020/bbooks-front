import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthGuard} from '../guards/auth-guard';
import {Observable} from 'rxjs';
import {UserBookTO} from '../models/userBookTO';
import {Tag} from '../models/tag';

@Injectable({
    providedIn: 'root'
})
export class UserbookService {
    api: string = environment.api + 'bookcases/';

    constructor(private http: HttpClient, private auth: AuthGuard) {
    }



    getAllByProfile(profileId: number): Observable<any> {
        return this.http.get(this.api + 'profile/' + profileId);
    }

    changeStatus(userBookUpdateStatusTO): Observable<any> {
        return this.http.put(this.api + 'status', userBookUpdateStatusTO);
    }

    save(userBookTo): Observable<any> {
        return this.http.post(this.api, userBookTo);
    }

    update(userBookTo: UserBookTO): Observable<any> {
        return this.http.put(this.api + userBookTo.id, userBookTo);
    }

    getById(id: number): Observable<UserBookTO> {
        return this.http.get<UserBookTO>(this.api + id);
    }

}
