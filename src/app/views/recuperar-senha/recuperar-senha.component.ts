import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
    form: FormGroup;

    showMessage: boolean;

    constructor(private fb: FormBuilder, private service: AuthService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            url: ['http://bbooks-front.herokuapp.com/redefinir-senha/'],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])]
        });
    }

    sendResetPassRequest() {
        this.service.sendResetPassEmail(this.form.value).pipe(take(1)).subscribe(
            () => {
                alert('Email enviado.');
                this.showMessage = true;
                this.form.disable();
            },
            error => {
                alert(error.error.message);
                console.log('Error reset pass', error);
                this.showMessage = false;
            });
    }

}
