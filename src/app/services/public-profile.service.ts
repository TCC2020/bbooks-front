import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserPublicProfileCreateTO} from '../models/UserPublicProfileCreateTO.model';
import {Observable} from 'rxjs';
import {UserPublicProfileTO} from '../models/UserPublicProfileTO.model';
import {UserPublicProfileUpdateTO} from '../models/UserPublicProfileUpdateTO.model';

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {

  api: string = environment.api + 'users/public-profiles/';

  constructor(
      private http: HttpClient
  ) { }

  searchByName(name: string): Observable<UserPublicProfileTO[]> {
    const params = new HttpParams()
        .set('name', name);
    return this.http.get<UserPublicProfileTO[]>(this.api + 'search', {params});
  }

  getById(id: string): Observable<UserPublicProfileTO> {
    return this.http.get<UserPublicProfileTO>(this.api + id);
  }

  getByUserId(userId: string): Observable<UserPublicProfileTO> {
    return this.http.get<UserPublicProfileTO>(this.api + 'user/' + userId);
  }

  create(userPublicProfileCreateTO: UserPublicProfileCreateTO): Observable<UserPublicProfileTO> {
    return this.http.post<UserPublicProfileTO>(this.api, userPublicProfileCreateTO);
  }

  update(userPublicProfileUpdateTO: UserPublicProfileUpdateTO): Observable<UserPublicProfileTO> {
    return this.http.put<UserPublicProfileTO>(this.api + userPublicProfileUpdateTO.id, userPublicProfileUpdateTO);
  }

  follow(publicProfileId: string): Observable<any> {
    return this.http.put<any>(this.api + 'follow/' + publicProfileId, publicProfileId);
  }

  unfollow(publicProfileId: string): Observable<any> {
    return this.http.put<any>(this.api + 'unfollow/' + publicProfileId, publicProfileId);
  }

  delete(publicProfileId: string): Observable<void> {
    return this.http.delete<void>(this.api + publicProfileId);
  }

}
