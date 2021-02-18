import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExchangeService {
    api = environment.competitionApi + 'book-ads';

    constructor() {
    }
}
