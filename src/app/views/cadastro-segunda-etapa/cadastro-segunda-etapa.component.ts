import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConsultaCepService} from "../../services/consulta-cep.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Country} from "../../models/country.model";
import {State} from "../../models/state.model";
import {City} from "../../models/city.model";
import {ProfileService} from "../../services/profile.service";
import {CDNService} from 'src/app/services/cdn.service';
import {BookAddDialogComponent} from "../book-page/book-add-dialog/book-add-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UploadComponent} from "../upload/upload.component";

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
    maxSize = 3579139;
    file;

    filteredOptionsCity: Observable<City[]>;

    constructor(
        private router: Router,
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private consultaCepService: ConsultaCepService,
        private profileService: ProfileService,
        private cdnService: CDNService,
        public dialog: MatDialog,
    ) {
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
            image: new FormControl({value: null, disabled: true}),
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
            error => {
                console.log('error update profile', error);
                localStorage.clear();
            }
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

    chooseFile(file) {
        if (file.size > this.maxSize) {
            alert('O arquivo é muito grande, favor formatar...');
        } else {
            this.file = file;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
    }

    async uploadFile() {
        await this.cdnService.uploadAsync(this.file, 'cdn-bbooks');
        this.file = null;
    }

    openDialogUpload() {
        const dialogRef = this.dialog.open(UploadComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.file = result;
                this.formCadastro2.get('image').setValue(result.name);
            } else {
                this.file = null;
            }
        });
    }

}
