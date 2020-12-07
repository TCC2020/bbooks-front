import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {GoogleBooksService} from './google-books.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    api = environment.api + 'authors';

    constructor(
        private http: HttpClient
    ) {
    }
    getAll(): Observable<any> {
      return this.http.get(this.api);
    }


}
