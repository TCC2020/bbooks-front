import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro-service.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  cadastroControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroService
  ) { 
    this.cadastroControl = this.fb.group({
      name: '',
      lastName: '',
      email: '',
      userName: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }


  //Validação automática de e-mail
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  matcherEmail = new MyErrorStateMatcher();

  //Validação automática de senha
  pwdFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(/^(?=\D*\d)(?=[^A-Za-z]*[A-Za-z]).{8,20}$/)
  ])
  matcherPwd = new MyErrorStateMatcher();

  //Validação automática de usuário
  userFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^([A-Z]|[a-z])[A-Za-z0-9.]*$")
  ])


  cadastrar(){
    
  this.cadastroControl.value.password = Md5.hashStr(this.cadastroControl.value.password);
  this.cadastroService.cadastrar(this.cadastroControl.value).subscribe(res => {
  
  this.router.navigateByUrl('cadastro/detalhes');
    },
        (err) => {
          alert(err.error.message);
        }
      );
    }


}
