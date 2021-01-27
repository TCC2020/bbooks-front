import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PostTO} from '../models/PostTO.model';
import {Observable} from 'rxjs';

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
}
