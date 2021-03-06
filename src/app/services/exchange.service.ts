import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExchangeT0} from '../models/exchangeT0,model';
import {ExchangeTokenTO} from '../models/ExchangeTokenTO.model';

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {
    api = environment.competitionApi + 'exchanges/';

    constructor(
        private http: HttpClient
    ) {
    }

    createExchange(exchange: ExchangeT0): Observable<ExchangeT0> {
        return this.http.post<ExchangeT0>(this.api, exchange);
    }

    getByUserReceived(idUser: string): Observable<ExchangeT0[]> {
        return this.http.get<ExchangeT0[]>(this.api + 'received/user/' + idUser);
    }

    getByUserSent(idUser: string): Observable<ExchangeT0[]> {
        return this.http.get<ExchangeT0[]>(this.api + 'sent/user/' + idUser);
    }

    accept(idExchange: string): Observable<ExchangeT0> {
        return this.http.put<ExchangeT0>(this.api + 'accept/' + idExchange, '');
    }

    refuse(idExchange: string): Observable<ExchangeT0> {
        return this.http.put<ExchangeT0>(this.api + 'refuse/' + idExchange, '');
    }

    cancel(idExchange: string): Observable<ExchangeT0> {
        return this.http.put<ExchangeT0>(this.api + 'cancel/' + idExchange, '');
    }
    getById(idExchange: string): Observable<ExchangeT0> {
        return this.http.get<ExchangeT0>(this.api +  idExchange);
    }
    generateToken(idExchange: string): Observable<ExchangeTokenTO> {
        return this.http.put<ExchangeTokenTO>(this.api + 'generate-token/' +  idExchange, '');
    }
    exchangeByToken(token: string): Observable<ExchangeTokenTO> {
        return this.http.put<ExchangeTokenTO>(this.api + 'exchange-by-token/' +  token, '');
    }
}
