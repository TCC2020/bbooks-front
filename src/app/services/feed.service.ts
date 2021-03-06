import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostPagination} from '../models/pagination/post.pagination';
import {environment} from '../../environments/environment';
import {PostTO} from '../models/PostTO.model';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    api = environment.feedApi + 'feed/';

    constructor(
        private http: HttpClient
    ) {
    }

    getFeed(size: number, page: number): Observable<PostTO[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<PostTO[]>(this.api, {params});
    }

    getPersonFeed(profileId: number, size: number, page: number): Observable<PostPagination> {
        const params = new HttpParams()
            // .set('profileId', profileId.toString())
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<PostPagination>(this.api + profileId, {params});
    }

    getGroupFeed(groupId: string, size?: number, page?: number): Observable<PostTO[]> {
        // const params = new HttpParams()
        // .set('profileId', profileId.toString())
        // .set('page', page.toString())
        // .set('size', size.toString());
        return this.http.get<PostTO[]>(this.api + 'group/' + groupId);
    }
}
