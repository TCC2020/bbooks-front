import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-cadastro-segunda-etapa',
  templateUrl: './cadastro-segunda-etapa.component.html',
  styleUrls: ['./cadastro-segunda-etapa.component.scss']
})
export class CadastroSegundaEtapaComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }


  ngOnInit(): void {

  }

  inicial() {

    const userLogin = {
      email: this.auth.getUserGoogle().email,
      password: this.auth.getUserGoogle().password
    }
    this.auth.login(this.auth.getUserGoogle()).subscribe(res => {
      this.auth.authenticate(res, true);
      this.router.navigateByUrl('/');
    },
      (err) => {
        alert(err.error.message);
      }
    );

  }

}
