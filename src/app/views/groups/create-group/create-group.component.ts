import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mapPostPrivacy, PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {AuthService} from '../../../services/auth.service';
import {GroupService} from '../../../services/group.service';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

    public formGroup: FormGroup;
    public privacy = PostPrivacy;
    public mapPostPrivacy = mapPostPrivacy;
    buttonActiveForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private groupService: GroupService,
        private translate: TranslateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formGroup = this.formBuilder.group({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null),
            privacy: new FormControl(mapPostPrivacy.get(this.privacy.public_all), Validators.required),
            userId: new FormControl(this.authService.getUser().id)
        });
    }

    showCreateForm(): void {
        this.buttonActiveForm = !this.buttonActiveForm;
    }

    save(): void {
        Util.loadingScreen();
        this.groupService.save(this.formGroup.value)
            .pipe(take(1))
            .subscribe(() => {
                    Util.stopLoading();
                    this.translate.get('GRUPO_LEITURA.GRUPO_CRIADO').subscribe(message => {
                        Util.showSuccessDialog(message);
                        this.router.navigate(['/groups-search/your-groups']);
                    });
                },
                error => {
                    Util.stopLoading();
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('Error Grupo save', error);
                });
    }

}
