import {TestBed} from '@angular/core/testing';
import {CadastroService} from "./cadastro-service.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('CadastroService', () => {
    let service: CadastroService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ]
        });
        service = TestBed.inject(CadastroService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
