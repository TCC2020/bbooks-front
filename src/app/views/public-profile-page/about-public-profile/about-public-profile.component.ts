import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {UserPublicProfileTO} from '../../../models/UserPublicProfileTO.model';
import {PublicProfileService} from '../../../services/public-profile.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-about-public-profile',
    templateUrl: './about-public-profile.component.html',
    styleUrls: ['./about-public-profile.component.scss']
})
export class AboutPublicProfileComponent implements OnInit {

    isEditing = false;
    publicProfileTO: UserPublicProfileTO;
    publicProfileId: string;
    isOwner = false;

    constructor(
        private publicProfileService: PublicProfileService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.parent.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.getPublicProfileById(result);
                    this.publicProfileId = result;
                }
            );
    }

    getPublicProfileById(idPublic: string) {
        this.publicProfileService.getById(idPublic)
            .pipe(take(1))
            .subscribe(result => {
                this.publicProfileTO = result;
                if (this.publicProfileTO.user.id === this.authService.getUser().id) {
                    this.isOwner = true;
                }
            }, error => {
                console.log(error);
            });
    }

    isAdm(): boolean {
        return true;
    }

    changeToEdit(): void {
        this.isEditing = !this.isEditing;
    }

    update() {
        this.changeToEdit();
    }

}
