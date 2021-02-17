import {Component, OnInit} from '@angular/core';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {GroupTO} from '../../../models/GroupTO.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../../services/group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mapPostPrivacy, mapPostPrivacyStrinView, PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-about-group',
    templateUrl: './about-group.component.html',
    styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {

    isEditing = false;
    description: any;
    groupTO: GroupTO;
    formGroup: FormGroup;
    public mapPostPrivacy = mapPostPrivacy;
    public mapPostPrivacyView = mapPostPrivacyStrinView;

    public privacy = PostPrivacy;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private formBuilder: FormBuilder,
        private translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            this.createForm();
        });
    }

    private createForm(): void {
        this.formGroup = this.formBuilder.group({
            id: new FormControl(this.groupTO?.id, Validators.required),
            name: new FormControl(this.groupTO?.name, Validators.required),
            description: new FormControl(this.groupTO?.description),
            privacy: new FormControl(this.groupTO?.privacy, Validators.required),
            userId: new FormControl(this.groupTO?.userId),
            creationDate:  new FormControl(this.groupTO?.creationDate),
        });
    }

    isAdm(): boolean {
        return true;
    }

    changeToEdit(): void {
        this.isEditing = !this.isEditing;
    }

    update(): void {
        Util.loadingScreen();
        this.changeToEdit();
        this.groupService.update(this.formGroup.value)
            .pipe(take(1))
            .subscribe(result => {
                    Util.stopLoading();
                    this.groupTO = result;
                },
                error => {
                    Util.stopLoading();
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('erro update group service', error);
                });
    }

}
