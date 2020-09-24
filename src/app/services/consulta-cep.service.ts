import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Country} from "../models/country.model";
import {State} from "../models/state.model";
import {City} from "../models/city.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConsultaCepService {

    constructor(
        private http: HttpClient
    ) {
    }

    findByCep(cep: string) {
        const c = cep.replace(/\D/g, '');

        if (c !== null) {
            const validacep = /^[0-9]{8}$/;
            if (validacep.test(cep)) {
                return this.http.get(`https://viacep.com.br/ws/${c}/json`);
            }
        }
        return of({});
    }

    getStatesBr(): Observable<State[]> {
        return this.http.get<State[]>('assets/state.json');
    }

    getCitysBr(idState): Observable<City[]> {
        return this.http.get<City[]>('assets/city.json')
            .pipe(
                map(response => {
                   return response.filter(city => city.state.toString().includes(idState));
                })
            );
    }

    getStates(idCountry: string): Observable<State[]> {
        return this.http.get<any>('https://secure.geonames.org/childrenJSON?geonameId=' + idCountry + '&username=' + 'bulls2020') // bull2020 por environment.apicep
            .pipe(
                map(response => {
                    const t = response.geonames.map(result => {
                        const c = {
                            id: result.geonameId,
                            name: result.toponymName,
                        };
                        return c;
                    });
                    return this.orderBy(t);
                })
            );
    }

    getCitys(idState: string): Observable<City[]> {
        return this.http.get<any>('https://secure.geonames.org/childrenJSON?geonameId=' + idState + '&username=' + environment.apicep)
            .pipe(
                map(response => {
                    const t = response.geonames.map(result => {
                        const c = {
                            id: result.geonameId,
                            name: result.toponymName,
                        };
                        return c;
                    });
                    return this.orderBy(t);
                })
            );
    }

    getCountry(): Observable<Country[]> {
        return this.http.get<any>('https://secure.geonames.org/countryInfoJSON?lang=pt&username=' + "bulls2020") // trocar bulls2020 por environment.apicep
            .pipe(
                map(response => {
                    const t = response.geonames.map(result => {
                        const c = {
                            id: result.geonameId,
                            name: result.countryName,
                            code: result.fipsCode
                        };
                        return c;
                    });
                    return this.orderBy(t);
                })
            );
    }

    orderBy(array) {
        array.sort((a: any, b: any) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
