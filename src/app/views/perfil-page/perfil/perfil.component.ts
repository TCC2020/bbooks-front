import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from 'src/app/models/country.model';
import {ConsultaCepService} from 'src/app/services/consulta-cep.service';
import {City} from 'src/app/models/city.model';
import {State} from 'src/app/models/state.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';
import {ProfileService} from '../../../services/profile.service';
import {CDNService} from '../../../services/cdn.service';
import {Util} from '../../shared/Utils/util';
import {MatDialog} from '@angular/material/dialog';
import {UploadComponent} from '../../upload/upload.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    modeBasicInfo: boolean;
    basicInfo: FormGroup;
    userTO: UserTO;
    public countrys: Country[];
    public citys: City[];
    public states: State[];

    filteredOptionsCity: Observable<City[]>;

    constructor(
        private fb: FormBuilder,
        private consultaCepService: ConsultaCepService,
        private userService: UserService,
        private authService: AuthService,
        private profileService: ProfileService,
        private cdnService: CDNService,
        private matDialog: MatDialog,
        public translate: TranslateService,
    ) {

    }

    ngOnInit(): void {
        this.createForm();
        this.userService.getById(this.authService.getUser().id).subscribe(
            user => {
                this.userTO = user;
                this.createForm();
            }, error => {
                console.log('error', error);
            }
        );
        this.consultaCepService.getCountry().subscribe(result => {
            this.countrys = result;
            const country = this.countrys.find(c => c.name.includes(this.basicInfo.get('country').value));
            this.getStates(country);
        });
    }

    createForm() {
        this.basicInfo = this.fb.group({
            name: [this.userTO?.profile?.name ? this.userTO.profile.name : '', Validators.required],
            lastName: [this.userTO?.profile?.lastName ? this.userTO.profile.lastName : '', Validators.required],
            email: [this.userTO?.email ? this.userTO.email : '', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            userName: [this.userTO?.userName ? this.userTO.userName : '', Validators.compose([
                Validators.required,
                Validators.pattern('^([A-Z]|[a-z])[A-Za-z0-9.]*$')
            ])],
            birthDate: [this.userTO?.profile.birthDate ? this.userTO.profile.birthDate : ''],
            country: [this.userTO?.profile.country ? this.userTO.profile.country : ''],
            state: [this.userTO?.profile.state ? this.userTO.profile.state : ''],
            city: [this.userTO?.profile.city ? this.userTO.profile.city : ''],
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
        this.basicInfo.get('city').setValue('');
        if (state.sigla) {
            this.consultaCepService.getCitysBr(state.id).subscribe(
                res => {
                    this.citys = res;
                    this.filteredOptionsCity = this.basicInfo.get('city').valueChanges.pipe(
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
                    this.filteredOptionsCity = this.basicInfo.get('city').valueChanges.pipe(
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

    verificaValidToTouched(campo: string) {
        return this.basicInfo.get(campo).invalid || this.basicInfo.get(campo).touched;
    }

    changeModeBasicInfo() {
        return this.modeBasicInfo = !this.modeBasicInfo;
    }

    save() {
        this.userTO.profile.name = this.basicInfo.get('name').value;
        this.userTO.profile.lastName = this.basicInfo.get('lastName').value;
        this.userTO.email = this.basicInfo.get('email').value;
        this.userTO.userName = this.basicInfo.get('userName').value;
        this.userTO.profile.birthDate = this.basicInfo.get('birthDate').value;
        this.userTO.profile.country = this.basicInfo.get('country').value;
        this.userTO.profile.state = this.basicInfo.get('state').value;
        this.userTO.profile.city = this.basicInfo.get('city').value;
        this.userService.update(this.userTO).subscribe(
            response => {
                this.profileService.update(this.userTO.profile).subscribe(profile => {
                        this.userTO = response;
                        this.userTO.profile = profile;
                        this.changeModeBasicInfo();
                    },
                    error => {
                        console.log('error update profile', error);
                    });
            },
            error => {
                console.log('error update', error);
            }
        );
    }

    showDialogUpload(): void {
        const dialogRef = this.matDialog.open(UploadComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                Util.loadingScreen();
                this.cdnService.upload({file: result, type: 'image'}, {objectType: 'profile_image'}).subscribe(() => {
                        Util.stopLoading();
                        let image = result;
                        const reader = new FileReader();
                        reader.onload = (e) => image = e.target.result;
                        reader.readAsDataURL(image);
                        this.userTO.profile.profileImage = image;
                    },
                    error => {
                        Util.stopLoading();
                        this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(msg => {
                            Util.showErrorDialog(msg);
                        });
                        console.log('error upload', error);
                    });
            }
        });

    }
}
