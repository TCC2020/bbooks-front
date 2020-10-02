import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Profile} from '../models/profileTO.model';

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
        return this.http.put(this.api + '/' + profile.id, profile);
    }

    updatePerfil(profile): Observable<any> {
        return this.http.put(this.api + profile.id, profile);
    }

    getById(id: number): Observable<Profile> {
        return this.http.get<Profile>(this.api + id);
    }
}
