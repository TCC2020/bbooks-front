import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookAdTO} from '../models/BookAdTO.model';

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {
    api = environment.competitionApi + 'book-ads/';

    constructor(
        private http: HttpClient
    ) {
    }
}
