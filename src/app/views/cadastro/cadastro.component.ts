import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro-service.service';
import { Md5 } from 'ts-md5/dist/md5';

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

  cadastrar(){
    
  this.cadastroControl.value.password = Md5.hashStr(this.cadastroControl.value.password);
  this.cadastroService.cadastrar(this.cadastroControl.value).subscribe(res => {
  
  this.router.navigateByUrl('continuar-cadastro');
    },
        (err) => {
          alert(err.error.message);
        }
      );
    }


}
