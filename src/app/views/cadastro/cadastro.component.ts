import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CadastroService} from '../../services/cadastro-service.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserTO} from '../../models/userTO.model';
import {AuthService} from '../../services/auth.service';
import {EncryptService} from 'src/app/services/encrypt.service';
import {take} from 'rxjs/operators';

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
        private encrypt: EncryptService
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
                Validators.email
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
        this.cadastroControl.value.password = this.encrypt.encryptPass(this.cadastroControl.value.password);
        this.cadastroService.cadastrar(this.cadastroControl.value).pipe(take(1)).subscribe((res: UserTO) => {
                const userLogin = {
                    email: res.email,
                    token: res.token
                };
                this.auth.loginToken(userLogin).pipe(take(1)).subscribe((loginTo: UserTO) => {
                        this.auth.setUserRegister(loginTo);
                        this.router.navigateByUrl('continuar-cadastro');
                    },
                    error => {
                        console.log('error login', error);
                    });
            },
            (err) => {
                alert(err.error.message);
            }
        );
    }
}
