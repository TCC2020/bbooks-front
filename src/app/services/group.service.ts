import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GroupTO} from '../models/GroupTO.model';
import {Observable} from 'rxjs';

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

    getById(idGroup: number): Observable<GroupTO> {
        return this.http.get<GroupTO>(this.api + idGroup);
    }
    delete(idGroup: number): Observable<void> {
        return this.http.get<void>(this.api + idGroup);
    }
}
