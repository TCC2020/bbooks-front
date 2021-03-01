import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConsultaCepService} from '../../services/consulta-cep.service';
import {Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {Country} from '../../models/country.model';
import {State} from '../../models/state.model';
import {City} from '../../models/city.model';
import {ProfileService} from '../../services/profile.service';
import {CDNService} from 'src/app/services/cdn.service';
import {MatDialog} from '@angular/material/dialog';
import {UploadComponent} from '../upload/upload.component';
import {DateAdapter} from '@angular/material/core';
import {Profile} from '../../models/profileTO.model';
import {Util} from '../shared/Utils/util';

@Component({
    selector: 'app-cadastro-segunda-etapa',
    templateUrl: './cadastro-segunda-etapa.component.html',
    styleUrls: ['./cadastro-segunda-etapa.component.scss']
})
export class CadastroSegundaEtapaComponent implements OnInit {
    public formCadastro2: FormGroup;
    public citys: City[];
    public countrys: Country[];
    public states: State[];
    public profileTo: Profile;
    userLogin = {
        email: this.auth.getUserRegister().email,
        token: this.auth.getUserRegister().token
    };
    maxSize = 3579139;
    file;

    filteredOptionsCity: Observable<City[]>;

    constructor(
        private router: Router,
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private consultaCepService: ConsultaCepService,
        private profileService: ProfileService,
        private cdnService: CDNService,
        public dialog: MatDialog,
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
            image: new FormControl({value: null, disabled: true}),
            birthDate: new FormControl('', Validators.required),
            country: new FormControl(''),
            city: new FormControl(''),
            state: new FormControl('')
        });
    }

    getStates(country: Country) {
        Util.loadingScreen();
        if (country.id.toString().includes('3469034')) {
            this.consultaCepService.getStatesBr().subscribe(
                res => { this.states = res; Util.stopLoading(); },
                error => { console.log('error states', error); Util.stopLoading(); }
            );
        } else {
            this.consultaCepService.getStates(country.id).subscribe(
                res => { this.states = res; Util.stopLoading(); },
                error => { console.log('error states', error); Util.stopLoading(); }
            );
        }
    }


    getCitys(state: State) {
        Util.loadingScreen();
        if (state.sigla) {
            this.consultaCepService.getCitysBr(state.id).subscribe(
                res => {
                    Util.stopLoading();
                    this.citys = res;
                    this.filteredOptionsCity = this.formCadastro2.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                },
                error => { console.log('error get citys', error);  Util.stopLoading();}
            );

        } else {
            this.consultaCepService.getCitys(state.id).subscribe(
                res => {
                    Util.stopLoading();
                    this.citys = res;
                    this.filteredOptionsCity = this.formCadastro2.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                },
                error => { console.log('error get citys', error);  Util.stopLoading(); }
            );
        }

    }

    private _filterCity(value: string): City[] {
        const filterValue = value.toLowerCase();
        return this.citys.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    updateProfileTo() {
        this.profileTo.birthDate = this.formCadastro2.get('birthDate').value;
        this.profileTo.country = this.formCadastro2.get('country').value;
        this.profileTo.city = this.formCadastro2.get('city').value;
        this.profileTo.state = this.formCadastro2.get('state').value;
    }

    loginRegister() {

        this.formCadastro2.get('id').setValue(this.auth.getUserRegister().profile.id);
        if (this.auth.getUserRegister().profile.profileImage) {
            this.getByIdToUpdateProfile();
        } else {
            if (this.file) {
                Util.loadingScreen();
                this.cdnService.upload({file: this.file, type: 'image'}, {objectType: 'profile_image'}).subscribe(() => {
                        this.getByIdToUpdateProfile();
                    },
                    error => {
                        Util.stopLoading();
                        console.log('error upload', error);
                        localStorage.clear();
                    });
            } else {
                this.getByIdToUpdateProfile();
            }
        }

    }

    getByIdToUpdateProfile(): void {
        Util.loadingScreen();
        this.profileService.getById(this.auth.getUserRegister().profile.id).pipe(take(1)).subscribe((profile: Profile) => {
            Util.stopLoading();
            this.profileTo = profile;
            this.updateProfileTo();
            this.updateProfileToLogin();
        });
    }

    updateProfileToLogin(): void {
        Util.loadingScreen();
        this.profileService.update(this.profileTo).subscribe(
            () => {
                Util.stopLoading();
                this.login();
            },
            error => {
                Util.stopLoading();
                console.log('error update profile', error);
                localStorage.clear();
            }
        );
    }

    login(): void {
        Util.loadingScreen();
        this.auth.loginToken(this.userLogin).pipe(take(1)).subscribe(res => {
                Util.stopLoading();
                localStorage.clear();
                this.auth.authenticate(res, true);
                this.router.navigate(['/feed']);
            },
            (err) => {
                Util.stopLoading();
                alert(err.error.message);
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
