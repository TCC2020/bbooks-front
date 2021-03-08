import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicProfileService} from '../../../services/public-profile.service';
import {UserPublicProfileTO} from '../../../models/UserPublicProfileTO.model';
import {take} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {UserPublicProfileCreateTO} from '../../../models/UserPublicProfileCreateTO.model';

@Component({
    selector: 'app-create-public-profile',
    templateUrl: './create-public-profile.component.html',
    styleUrls: ['./create-public-profile.component.scss']
})
export class CreatePublicProfileComponent implements OnInit {

    formCreatePublicProfile: FormGroup;
    userPublicProfileCreateTO: UserPublicProfileCreateTO;

    constructor(
        private formBuilder: FormBuilder,
        private publicProfileService: PublicProfileService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.formCreatePublicProfile = this.formBuilder.group({
            name: new FormControl(this.userPublicProfileCreateTO ? this.userPublicProfileCreateTO.name : null, Validators.required),
            description: new FormControl(this.userPublicProfileCreateTO ? this.userPublicProfileCreateTO.description : null, Validators.required)
        });
    }

    createPublicProfile() {
        this.publicProfileService.create(this.formCreatePublicProfile.value)
            .pipe(take(1))
            .subscribe(result => {
                console.log(result);
            }, error => {
                console.log(error);
            });
    }

}
