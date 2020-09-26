import {TestBed} from '@angular/core/testing';

import {ConsultaCepService} from './consulta-cep.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConsultaCepService', () => {
    let service: ConsultaCepService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(ConsultaCepService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
