import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CadastroSegundaEtapaComponent} from './cadastro-segunda-etapa.component';
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {ConsultaCepService} from "../../services/consulta-cep.service";
import {ProfileService} from "../../services/profile.service";
import {RouterTestingModule} from "@angular/router/testing";
import {SocialAuthServiceConfigMock} from "../../mocks/google.provide.mock";
import {SocialLoginModule} from "angularx-social-login";

describe('CadastroSegundaEtapaComponent', () => {
    let component: CadastroSegundaEtapaComponent;
    let fixture: ComponentFixture<CadastroSegundaEtapaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CadastroSegundaEtapaComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                SocialLoginModule
            ],
            providers: [
                AuthService,
                FormBuilder,
                ConsultaCepService,
                ProfileService,
                SocialAuthServiceConfigMock
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
