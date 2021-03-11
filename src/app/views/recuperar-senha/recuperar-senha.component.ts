import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import { Util } from '../shared/Utils/util';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
    form: FormGroup;

    showMessage: boolean;

    constructor(
        private fb: FormBuilder,
        private service: AuthService,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            url: [environment.webFront + '/nova-senha/'],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])]
        });
    }

    sendResetPassRequest() {
        Util.loadingScreen();
        this.service.sendResetPassEmail(this.form.value).pipe(take(1)).subscribe(
            () => {
                Util.stopLoading();
                this.translate.get('PADRAO.EMAIL_ENVIADO').subscribe(message => {
                    Util.showSuccessDialog(message);
                    this.showMessage = true;
                    this.form.disable();
                });
            },
            error => {
                Util.stopLoading();
                let codeMessage = '';
                if (error.error.message.includes('US001')) {
                    codeMessage = 'US001';
                }
                if (codeMessage) {
                    this.translate.get('MESSAGE_ERROR.US001').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                } else {
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('Error reset pass', error);
                }
                this.showMessage = false;
            });
    }

}
