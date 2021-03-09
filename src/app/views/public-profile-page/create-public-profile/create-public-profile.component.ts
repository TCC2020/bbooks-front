import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicProfileService} from '../../../services/public-profile.service';
import {UserPublicProfileTO} from '../../../models/UserPublicProfileTO.model';
import {map, take} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {UserPublicProfileCreateTO} from '../../../models/UserPublicProfileCreateTO.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserPublicProfileUpdateTO} from '../../../models/UserPublicProfileUpdateTO.model';

@Component({
    selector: 'app-create-public-profile',
    templateUrl: './create-public-profile.component.html',
    styleUrls: ['./create-public-profile.component.scss']
})
export class CreatePublicProfileComponent implements OnInit {

    formCreatePublicProfile: FormGroup;
    userPublicProfileCreateTO: UserPublicProfileCreateTO;
    idPublicProfile: string;
    userPublicProfileUpdateTO: UserPublicProfileUpdateTO;

    constructor(
        private formBuilder: FormBuilder,
        private publicProfileService: PublicProfileService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    if (result) {
                        this.getById(result);
                    }
                }
            );
    }

    createForm() {
        this.formCreatePublicProfile = this.formBuilder.group({
            id: new FormControl(this.userPublicProfileCreateTO ? this.userPublicProfileCreateTO.id : null),
            name: new FormControl(this.userPublicProfileCreateTO ? this.userPublicProfileCreateTO.name : null, Validators.required),
            // tslint:disable-next-line:max-line-length
            description: new FormControl(this.userPublicProfileCreateTO ? this.userPublicProfileCreateTO.description : null, Validators.required)
        });
    }

    createPublicProfile() {
        this.publicProfileService.create(this.formCreatePublicProfile.value)
            .pipe(take(1))
            .subscribe(result => {
                this.router.navigateByUrl('perfil-publico/' + result.id);
            }, error => {
                console.log(error);
            });
    }

    getById(id: string) {
        this.publicProfileService.getById(id)
            .pipe(take(1))
            .subscribe(result => {
                this.userPublicProfileCreateTO = result;
                this.createForm();
            });
    }


    editPublicProfile() {
        this.publicProfileService.update(this.formCreatePublicProfile.value)
            .pipe(take(1))
            .subscribe(result => {
                this.router.navigateByUrl('perfil-publico/' + result.id);
            });
    }

}
