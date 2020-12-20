import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag';

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
    update(tag: Tag): Observable<Tag> {
        return this.http.put<Tag>(this.api + tag.id, tag);
    }

    getAllByProfile(profileId: number): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api + 'profile/' + profileId);
    }
    getAllByUserBook(idUserBook: number): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.api + 'book/' + idUserBook);
    }
    getById(idTag: number): Observable<Tag> {
        return this.http.get<Tag>(`${this.api}${idTag}`);
    }

    delete(tagId: number): Observable<any> {
        return this.http.delete(this.api + tagId );
    }
}
