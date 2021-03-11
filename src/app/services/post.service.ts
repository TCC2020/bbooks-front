import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostTO} from '../models/PostTO.model';
import {Observable} from 'rxjs';
import {PostPagination} from '../models/pagination/post.pagination';
import {ReactTO} from '../models/ReactTO.model';
import {PostReactionTO} from '../models/PostReactionTO.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    api = environment.feedApi + 'post/';

    constructor(
        private http: HttpClient,
    ) {
    }

    save(post: PostTO): Observable<PostTO> {
        return this.http.post<PostTO>(this.api, post);
    }
    update(post: PostTO): Observable<PostTO> {
        return this.http.put<PostTO>(this.api + post.id, post);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(this.api + id);
    }
    getByProfileId(profileId: number, size: number, page: number): Observable<PostPagination> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<PostPagination>(this.api + 'profile/' + profileId , {params});
    }

    getComment(postId: string, size: number, page: number): Observable<PostTO[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<PostTO[]>(this.api + 'comment/' + postId , {params});
    }

    react(react: ReactTO): Observable<PostReactionTO> {
        return this.http.put<PostReactionTO>(this.api + react.postId + '/react', react);
    }
    getPageFeed(pageId: string, size?: number, page?: number): Observable<PostPagination> {
        const params = new HttpParams()
        .set('pageId', pageId)
        .set('page', page.toString())
        .set('size', size.toString());
        return this.http.get<PostPagination>(this.api + 'page/' + pageId, {params});
    }
}
