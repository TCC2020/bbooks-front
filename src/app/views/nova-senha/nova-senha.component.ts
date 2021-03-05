import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {ProfileService} from 'src/app/services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../models/userTO.model';
import {MyErrorStateMatcher} from '../cadastro/cadastro.component';
import { TranslateService } from '@ngx-translate/core';
import { Util } from '../shared/Utils/util';


@Component({
    selector: 'app-nova-senha',
    templateUrl: './nova-senha.component.html',
    styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {

    hide = true;
    matcher = new MyErrorStateMatcher();
    newPassword: FormGroup;
    user: UserTO;

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.route.params.subscribe((result) => {
            const token = result.token;
            this.authService.getByToken(token).subscribe(
                user => {
                    this.user = user;
                    this.createForm();
                }
            );
        });

    }

    createForm() {
        this.newPassword = this.fb.group({
            email: [this.user?.email ? this.user.email : '', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                Validators.pattern('^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$')
            ])],
            confirmPassword: [''],
        }, {validator: this.checkPasswords});
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : {notSame: true};
    }

    resetPassword() {
        const resetPass = {
            token: this.user.token,
            password: this.newPassword.get('password').value
        };
        this.authService.resetPass(resetPass).subscribe(value => {
            this.translate.get('PADRAO.SENHA_ALTERADA').subscribe(message => {
                Util.showErrorDialog(message);
            });
            this.router.navigate(['/']);
        }, error => {
            console.log('error reset pass', error);
        });
    }
}
