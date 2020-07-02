import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router,
  ) {
    this.loginControl = this.fb.group({
      email: '',
      password: '',
      keepLogin: [false]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginControl.value.password = Md5.hashStr(this.loginControl.value.password);
    this.authService.login(this.loginControl.value).subscribe(res => {
      this.authGuard.login(res, this.loginControl.value.keepLogin);
      this.router.navigateByUrl('/');
    },
      (err) => {
        alert(err.error.message);
      }
    );
  }

}
