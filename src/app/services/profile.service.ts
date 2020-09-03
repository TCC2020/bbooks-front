import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    api: string = environment.api + 'profiles/';

    constructor(
        private http: HttpClient
    ) {
    }

    update(profile): Observable<any> {
        return this.http.put(this.api + 'profileRegister',  profile);
    }
}
