import {TestBed} from '@angular/core/testing';

import {ConsultaCepService} from './consulta-cep.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {readingsTrackingMock} from '../mocks/tracking.model';

describe('ConsultaCepService', () => {
    let service: ConsultaCepService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(ConsultaCepService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should create consulta-cep service', () => {
        expect(service).toBeTruthy();
    });

    it('findByCep: should call http get', done => {
        service.findByCep('08577000')
            .subscribe(() => {
            });
        const req = httpMock.expectOne('https://viacep.com.br/ws/08577000/json');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('findByCep: should observable {} with cep invalido', done => {
        service.findByCep('085770')
            .subscribe((result) => {
                expect(result).toStrictEqual({});
                done();
            });
    });

    it('getStatesBr: should call http get', done => {
        service.getStatesBr()
            .subscribe(() => {
            });
        const req = httpMock.expectOne('assets/state.json');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getCitysBr: should call http get', done => {
        service.getCitysBr('1')
            .subscribe(() => {
            });
        const req = httpMock.expectOne('assets/city.json');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getStates: should call http get', done => {
        service.getStates('1')
            .subscribe(() => {
            });
        const req = httpMock.expectOne('https://secure.geonames.org/childrenJSON?geonameId=' + '1' + '&username=' + 'Bulls2020');
        expect(req.request.method).toBe('GET');
        done();
    });

    it('getCitys: should call http get', done => {
        service.getCitys('1')
            .subscribe(() => {
            });
        const req = httpMock.expectOne('https://secure.geonames.org/childrenJSON?geonameId=' + '1' + '&username=' + 'Bulls2020');
        expect(req.request.method).toBe('GET');
        done();
    });


    it('orderBy: should order items', done => {
        const items = [
            { name: 'fabiola'},
            { name: 'icaro'},
            { name: 'pedro'},
            { name: 'wendell'},
            { name: 'alisson'},
            { name: 'wendell'},

        ];
        const result = service.orderBy(items);
        expect(result[0].name).toEqual('alisson');
        expect(result[1].name).toEqual('fabiola');
        expect(result[2].name).toEqual('icaro');
        expect(result[3].name).toEqual('pedro');
        expect(result[4].name).toEqual('wendell');
        expect(result[5].name).toEqual('wendell');
        done();
    });

});
