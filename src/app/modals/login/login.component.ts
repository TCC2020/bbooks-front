import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {UserTO} from '../../models/userTO.model';
import {UserService} from '../../services/user.service';
import {Profile} from '../../models/profileTO.model';

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
        private router: Router,
        private authServiceSocial: SocialAuthService,
        private userService: UserService
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
                userTO.profile = new Profile();
                userTO.userName = this.user.id;
                userTO.profile.name = this.user.firstName;
                userTO.profile.lastName = this.user.lastName;
                userTO.email = this.user.email;
                userTO.token = this.user.authToken;
                userTO.idToken = this.user.idToken;
                userTO.idSocial = this.user.id;
                userTO.profile.profileImage = this.user.photoUrl;
                this.userService.verifyEmailForGoogle(userTO.email).subscribe(
                    (result: UserTO) => {
                        if (result?.id) {
                            const userLogin = {
                                email: result.email,
                                token: result.token
                            };
                            this.LoginFinalizeToken(userLogin);
                        } else {
                            this.authService.setUserRegister(userTO);
                            this.router.navigateByUrl('/cadastro');
                        }
                    }, error => {
                        console.log('error login google', error);
                    }
                );
            }

        });
    }

    login(): void {
        this.loginFinalize(this.loginControl.value);
    }

    loginFinalize(userLogin): void {
        this.authService.login(userLogin).subscribe(res => {
                this.authService.authenticate(res, this.loginControl.value.keepLogin);
                this.router.navigateByUrl('/');
            },
            (err) => {
                alert(err.error.message);
            }
        );
    }
    LoginFinalizeToken(userLogin): void {
        this.authService.loginToken(userLogin).subscribe(res => {
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
