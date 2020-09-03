import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {AuthGuard} from 'src/app/guards/auth-guard';
import {Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import {SocialAuthService} from "angularx-social-login";
import {SocialUser} from "angularx-social-login";
import {UserTO} from "../../models/userTO.model";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide = true;
    
    loginControl: FormGroup;
    user: SocialUser;
    loggedIn: boolean;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private authGuard: AuthGuard,
        private router: Router,
        private authServiceSocial: SocialAuthService,
    ) {
        this.loginControl = this.fb.group({
            email: '',
            password: '',
            keepLogin: [false]
        });
    }

    ngOnInit(): void {
    }

    loginGoogleSocial() {
        this.authServiceSocial.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            if (this.loggedIn) {
                const userTO = new UserTO();
                userTO.userName = this.user.id;
                userTO.name = this.user.firstName;
                userTO.lastName = this.user.lastName;
                userTO.email = this.user.email;
                userTO.token = this.user.authToken;
                userTO.idToken = this.user.idToken;
                userTO.idSocial = this.user.id;
                userTO.password = this.user.id;

                this.authService.saveByGoogle(userTO).subscribe(res => {
                    this.authService.authenticate(res, this.loginControl.value.keepLogin);
                    this.router.navigateByUrl('/');
                });
            }

        });
    }

    login(): void {
        this.loginControl.value.password = Md5.hashStr(this.loginControl.value.password);
        this.authService.login(this.loginControl.value).subscribe(res => {
                this.authService.authenticate(res, this.loginControl.value.keepLogin);
                this.router.navigateByUrl('/');
            },
            (err) => {
                alert(err.error.message);
            }
        );
    }

    loginGoogle(): void {
        this.authService.signInWithGoogle();
        this.loginGoogleSocial();
    }

}
