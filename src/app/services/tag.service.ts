import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../models/tag";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    api = environment.api + 'tags/';

    constructor(private http: HttpClient) {
    }

    save(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(this.api, tag);
    }

    getAllByProfile(profileId: number): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api + 'profile/' + profileId);
    }
    getById(idTag: number): Observable<Tag> {
        return this.http.get<Tag>(`${this.api}tag/${idTag}`);
    }

    put(tagId: number, userBookId: number): Observable<Tag> {
        return this.http.put<Tag>(this.api,  `${tagId} /ta`);
    }
}
