import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginControl: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router,
    private authServiceSocial: SocialAuthService
  ) {
    this.loginControl = this.fb.group({
      email: '',
      password: '',
      keepLogin: [false]
    });
  }

  ngOnInit(): void {
    this.authServiceSocial.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
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
  loginGoogle(): void {
    this.authService.signInWithGoogle();
  }

}
