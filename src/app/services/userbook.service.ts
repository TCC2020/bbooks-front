import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthGuard} from "../guards/auth-guard";
import {Observable} from "rxjs";
import {UserBookTO} from "../models/userBookTO";
import {Tag} from "../models/tag";

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

    save(profileTO): Observable<any> {
        return this.http.post(this.api, profileTO);
    }
    update(userBookTo: UserBookTO): Observable<any> {
        return this.http.put(this.api , userBookTo);
    }

}
