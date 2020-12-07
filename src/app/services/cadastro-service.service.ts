import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    api = environment.api + 'users';

    constructor(
        private http: HttpClient,
    ) {
    }

    cadastrar(UserTO) {
        return this.http.post(this.api, UserTO);
    }

}
