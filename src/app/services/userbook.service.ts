import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthGuard} from '../guards/auth-guard';
import {Observable} from 'rxjs';
import {UserBookTO} from '../models/userBookTO';
import {Tag} from '../models/tag';
import {UserBooksDataStatusTO} from '../models/UserBooksDataStatusTO.model';

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

    getAllByProfileTimeLine(profileId: number): Observable<any> {
        const params = new HttpParams()
            .set('timeLine', 'true');
        return this.http.get(this.api + 'profile/' + profileId, {params});
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

    getDataStatusByBooksBookId(bookId: string): Observable<UserBooksDataStatusTO> {
        const params = new HttpParams()
            .set('bookId', bookId);
        return this.http.get<UserBooksDataStatusTO>(this.api + 'status-data', {params});
    }
    getDataStatusByBooksGoogleBook(googleBook: string): Observable<UserBooksDataStatusTO> {
        const params = new HttpParams()
            .set('googleBook', googleBook);
        return this.http.get<UserBooksDataStatusTO>(this.api + 'status-data', {params});
    }

}
