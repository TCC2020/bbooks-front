import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CadastroService} from '../../services/cadastro-service.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserTO} from '../../models/userTO.model';
import {AuthService} from '../../services/auth.service';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Util} from '../shared/Utils/util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.hasError('notSame') && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

    hide = true;
    cadastroControl: FormGroup;
    userTo: UserTO;
    matcher = new MyErrorStateMatcher();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private cadastroService: CadastroService,
        private auth: AuthService,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.userTo = this.auth.getUserRegister();
        this.createForm();
    }

    createForm() {
        this.cadastroControl = this.fb.group({
            name: [this.userTo?.profile?.name ? this.userTo.profile.name : '', Validators.required],
            lastName: [this.userTo?.profile?.lastName ? this.userTo.profile.lastName : '', Validators.required],
            email: [this.userTo?.email ? this.userTo.email : '', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+(\.[a-z0-9-]+).(\.[a-z]{2,4})$')
            ])],
            userName: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^([A-Z]|[a-z])[A-Za-z0-9.]*$')
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                Validators.pattern('^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$')
            ])],
            confirmPassword: [''],
            idSocial: [this.userTo?.idSocial ? this.userTo.idSocial : ''],
            profileImage: [this.userTo?.profile?.profileImage ? this.userTo.profile.profileImage : '']

        }, {validator: this.checkPasswords});
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : {notSame: true};
    }

    cadastrar() {
        const username = this.cadastroControl.get('userName').value;
        this.cadastroControl.get('userName').setValue(username.toLowerCase());
        Util.loadingScreen();
        this.cadastroService.cadastrar(this.cadastroControl.value).pipe(take(1)).subscribe((res: UserTO) => {
                const userLogin = {
                    email: res.email,
                    token: res.token
                };
                Util.stopLoading();
                Util.loadingScreen();
                this.auth.loginToken(userLogin).pipe(take(1)).subscribe((loginTo: UserTO) => {
                        Util.stopLoading();
                        this.auth.setUserRegister(loginTo);
                        this.router.navigateByUrl('continuar-cadastro');
                    },
                    error => {
                        console.log('error login', error);
                    });
            },
            (err) => {
                Util.stopLoading();
                let codMessage = '';
                // email
                if (err.error.message.includes('US002')) {
                    codMessage = 'US002';
                }
                // username
                if (err.error.message.includes('US005')) {
                    codMessage = 'US005';
                }
                if (codMessage) {
                    this.translate.get('MESSAGE_ERROR.' + codMessage).subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                } else {
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log(err);
                }
            }
        );
    }
}
