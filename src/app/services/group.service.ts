import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GroupTO} from '../models/GroupTO.model';
import {Observable} from 'rxjs';
import {GroupPagination} from '../models/pagination/group.pagination';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    api = environment.feedApi + 'group/';

    constructor(
        private http: HttpClient
    ) {
    }

    save(groupTO: GroupTO): Observable<GroupTO> {
        return this.http.post<GroupTO>(this.api, groupTO);
    }
    update(groupTO: GroupTO): Observable<GroupTO> {
        return this.http.put<GroupTO>(this.api + groupTO.id, groupTO);
    }

    getById(idGroup: string): Observable<GroupTO> {
        return this.http.get<GroupTO>(this.api + idGroup);
    }
    delete(idGroup: string): Observable<void> {
        return this.http.delete<void>(this.api + idGroup);
    }
    getByName(search: string, size: number, page: number): Observable<GroupPagination> {
        const params = new HttpParams()
            .set('name', search)
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<GroupPagination>(this.api, {params});
    }
}
