import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaCepService} from '../../services/consulta-cep.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Country} from '../../models/country.model';
import {State} from '../../models/state.model';
import {City} from '../../models/city.model';
import {ProfileService} from '../../services/profile.service';
import {DateAdapter} from '@angular/material/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-cadastro-segunda-etapa',
    templateUrl: './cadastro-segunda-etapa.component.html',
    styleUrls: ['./cadastro-segunda-etapa.component.scss']
})
export class CadastroSegundaEtapaComponent implements OnInit {
    public formCadastro2: FormGroup;
    public citys: City[];
    public countrys: Country[];
    public states: State[]

    filteredOptionsCity: Observable<City[]>;

    constructor(
        private router: Router,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private consultaCepService: ConsultaCepService,
        private profileService: ProfileService,
        private adapter: DateAdapter<any>,
    ) {
        this.auth.language.subscribe(lang => {
            this.adapter.setLocale(lang);
        });
    }

    ngOnInit(): void {
        this.createForm();
        this.consultaCepService.getCountry().subscribe(result => {
            this.countrys = result;
        });
    }

    private createForm(): void {
        this.formCadastro2 = this.formBuilder.group({
            id: [],
            image: new FormControl(null),
            birthDate: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required)
        });
    }

    getStates(country: Country) {
        if (country.id.toString().includes('3469034')) {
            this.consultaCepService.getStatesBr().subscribe(
                res => this.states = res,
                error => console.log('error states', error)
            );
        } else {
            this.consultaCepService.getStates(country.id).subscribe(
                res => this.states = res,
                error => console.log('error states', error)
            );
        }
    }


    getCitys(state: State) {
        if (state.sigla) {
            this.consultaCepService.getCitysBr(state.id).subscribe(
                res => {
                    this.citys = res;
                    this.filteredOptionsCity = this.formCadastro2.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                },
                error => console.log('error get citys', error)
            );

        } else {
            this.consultaCepService.getCitys(state.id).subscribe(
                res => {
                    this.citys = res;
                    this.filteredOptionsCity = this.formCadastro2.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                },
                error => console.log('error get citys', error)
            );
        }

    }

    private _filterCity(value: string): City[] {
        const filterValue = value.toLowerCase();
        return this.citys.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    loginRegister() {
        const userLogin = {
            email: this.auth.getUserRegister().email,
            password: this.auth.getUserRegister().password
        }
        this.formCadastro2.get('id').setValue(this.auth.getUserRegister().profile.id);
        this.profileService.update(this.formCadastro2.value).subscribe(
            () => {
                this.auth.login(userLogin).subscribe(res => {
                        localStorage.clear();
                        this.auth.authenticate(res, true);
                        this.router.navigateByUrl('/');
                    },
                    (err) => {
                        alert(err.error.message);
                        localStorage.clear();
                    }
                );
            },
            error => {console.log('error update profile', error); localStorage.clear(); }
        );

    }

    consultaCep() {
        const cep = this.formCadastro2.get('cep').value;
        if (cep != null && cep !== '') {
            this.consultaCepService.findByCep(cep).subscribe(
                response => {
                    this.setData(response);
                }
            );
        }
    }

    setData(dados) {
        this.formCadastro2.patchValue({
            cep: dados.cep,
            city: dados.localidade,
            state: dados.uf
        });
    }

    verificaValidToTouched(campo: string) {
        return this.formCadastro2.get(campo).invalid || this.formCadastro2.get(campo).touched;
    }

}
