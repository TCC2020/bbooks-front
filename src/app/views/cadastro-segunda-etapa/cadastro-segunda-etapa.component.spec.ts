import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CadastroSegundaEtapaComponent} from './cadastro-segunda-etapa.component';
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CadastroSegundaEtapaComponent', () => {
    let component: CadastroSegundaEtapaComponent;
    let fixture: ComponentFixture<CadastroSegundaEtapaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CadastroSegundaEtapaComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CadastroSegundaEtapaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
