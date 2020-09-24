import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  modeBasicInfo: boolean = false;
  basicInfo: FormGroup;
  profileTo: any;
  public countrys: Country[];
  public citys: City[];
  public states: State[]

    filteredOptionsCity: Observable<City[]>;

  constructor(
    private fb: FormBuilder,
    private consultaCepService: ConsultaCepService,
    private profileService: ProfileService,
    private authService: AuthService
    ) { 
    
  }

  ngOnInit(): void {
    this.createForm();
    this.profileService.getById(this.authService.getUser().profile.id).subscribe(
      user => {
        this.profileTo = user;
        console.log(this.profileTo);
        this.createForm();
      }
    );
    this.consultaCepService.getCountry().subscribe(result => {
      this.countrys = result;
      // this.getStates(this.basicInfo.get('country').value.id);
  });
  }

  createForm() {
    this.basicInfo = this.fb.group({
        name: [this.profileTo?.name ? this.profileTo.name : '', Validators.required],
        lastName: [this.profileTo?.lastName ? this.profileTo.lastName : '', Validators.required],
        email: [this.profileTo?.user?.email ? this.profileTo.user.email : '', Validators.compose([
            Validators.required,
            Validators.email
        ])],
        userName: [this.profileTo?.user?.userName ? this.profileTo.user.userName : '', Validators.compose([
            Validators.required,
            Validators.pattern('^([A-Z]|[a-z])[A-Za-z0-9.]*$')
        ])],
        birthDate: [this.profileTo?.birthDate ? this.profileTo.birthDate : ''],
        country: [this.profileTo?.country ? this.profileTo.country : ''],
        state: [this.profileTo?.state ? this.profileTo.state : ''],
        city: [this.profileTo?.city ? this.profileTo.city : ''],
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

save(){
  this.profileTo.user.name = this.basicInfo.get('name').value;
  this.profileTo.user.lastName = this.basicInfo.get('lastName').value;
  this.profileTo.user.email = this.basicInfo.get('email').value;
  this.profileTo.user.userName = this.basicInfo.get('userName').value;
  this.profileTo.birthDate = this.basicInfo.get('birthDate').value;
  this.profileTo.country = this.basicInfo.get('country').value;
  this.profileTo.state = this.basicInfo.get('state').value;
  this.profileTo.city = this.basicInfo.get('city').value;

  console.log(this.profileTo);

  this.profileService.updatePerfil(this.profileTo).subscribe(
    response => {
      this.profileTo = response;
      console.log(response);
      this.changeModeBasicInfo();
    }
  );
}

}