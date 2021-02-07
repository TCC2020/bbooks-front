import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

    public formGroup: FormGroup;
    public privacy = PostPrivacy;
    buttonActiveForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formGroup = this.formBuilder.group({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null),
            privacy: new FormControl(this.privacy.public_all, Validators.required),
            userId: new FormControl(this.authService.getUser().id)
        });
    }

    showCreateForm(): void {
        this.buttonActiveForm = !this.buttonActiveForm;
    }

}
