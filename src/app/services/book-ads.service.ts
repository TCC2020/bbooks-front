import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BookAdTO} from '../models/BookAdTO.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookAdsService {
    api = environment.competitionApi + 'book-ads/';

    constructor(
        private http: HttpClient
    ) {
    }

    create(bookAdTO: BookAdTO): Observable<BookAdTO> {
        return this.http.post<BookAdTO>(this.api, bookAdTO);
    }

    update(bookAdTO: BookAdTO): Observable<BookAdTO> {
        return this.http.put<BookAdTO>(this.api, bookAdTO);
    }

    getAll(): Observable<BookAdTO[]> {
        return this.http.get<BookAdTO[]>(this.api);
    }

    getAllByUser(idUser: number): Observable<BookAdTO[]> {
        return this.http.get<BookAdTO[]>(this.api + 'user/' + idUser);
    }

    delete(idBookAdTO: string): Observable<void> {
        return this.http.delete<void>(this.api + idBookAdTO);
    }

    getById(id: string): Observable<BookAdTO> {
        return this.http.get<BookAdTO>(this.api + id);
    }
}
