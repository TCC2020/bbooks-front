import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  form = this.fb.group({
    url: ['http://bbooks-ifsp.herokuapp.com/redefinir-senha/'],
    email: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
  }

  sendResetPassRequest() {
    console.log(this.form.value)
    this.service.sendResetPassEmail(this.form.value).subscribe(res => {
      alert('Email enviado.')
    });
  }

}
