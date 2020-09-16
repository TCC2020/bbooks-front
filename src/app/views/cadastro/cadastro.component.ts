import {Component, OnInit, OnChanges} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CadastroService} from '../../services/cadastro-service.service';
import {Md5} from 'ts-md5/dist/md5';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserTO} from "../../models/userTO.model";
import {AuthService} from "../../services/auth.service";

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
        private auth: AuthService
    ) {
    }

    ngOnInit(): void {
        this.userTo = this.auth.getUserRegister();
        this.createForm();
    }

    createForm() {
        this.cadastroControl = this.fb.group({
            name: [this.userTo?.name ? this.userTo.name : '', Validators.required],
            lastName: [this.userTo?.lastName ? this.userTo.lastName : '', Validators.required],
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
            idSocial: [this.userTo?.idSocial ? this.userTo.idSocial : '']
        }, {validator: this.checkPasswords});
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : {notSame: true}
    }

    cadastrar() {
        const username = this.cadastroControl.get('userName').value;
        this.cadastroControl.get('userName').setValue(username.toLowerCase());
        this.cadastroControl.value.password = Md5.hashStr(this.cadastroControl.value.password);
        this.cadastroService.cadastrar(this.cadastroControl.value).subscribe(res => {
                this.auth.setUserRegister(res);
                this.router.navigateByUrl('continuar-cadastro');
            },
            (err) => {
                alert(err.error.message);
            }
        );
    }
}
