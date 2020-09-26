import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {AuthGuard} from 'src/app/guards/auth-guard';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {UserTO} from '../../models/userTO.model';
import {UserService} from '../../services/user.service';
import { EncryptService } from 'src/app/services/encrypt.service';

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
        private encrypt: EncryptService,
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
                userTO.userName = this.user.id;
                userTO.name = this.user.firstName;
                userTO.lastName = this.user.lastName;
                userTO.email = this.user.email;
                userTO.token = this.user.authToken;
                userTO.idToken = this.user.idToken;
                userTO.idSocial = this.user.id;
                this.userService.verifyEmail(userTO.email).subscribe(
                    (result: UserTO) => {
                        if (result) {
                            const userLogin = {
                                email: result.email,
                                password: result.password
                            }
                            this.loginFinalize(userLogin);
                        }
                    }, error => {
                        if (error.error.message === 'User not found') {
                            this.authService.setUserRegister(userTO);
                            this.router.navigateByUrl('/cadastro');
                        } else {
                            console.log('error login google', error);
                        }

                    }
                );
            }

        });
    }

    login(): void {
        this.loginControl.value.password = this.encrypt.encryptPass(this.loginControl.value.password);
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

    loginGoogle(): void {
        this.authService.signInWithGoogle();
        this.loginGoogleSocial();
    }

}
