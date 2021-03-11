import {Component, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {UserPublicProfileTO} from '../../../models/UserPublicProfileTO.model';
import {PublicProfileService} from '../../../services/public-profile.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-public-profile',
    templateUrl: './public-profile.component.html',
    styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {

    links = ['feed', 'about'];
    publicProfileTO: UserPublicProfileTO;
    publicProfileId: string;
    isOwner = false;
    isFollower = true;

    constructor(
        private publicProfileService: PublicProfileService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.getPublicProfileById(result);
                    this.publicProfileId = result;
                }
            );
        this.verifyIsFollower();
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

    getPublicProfile() {
      this.publicProfileService.getByUserId(this.authService.getUser().id)
          .pipe(take(1))
          .subscribe(result => {
            this.publicProfileTO = result;
          }, error => {
            console.log(error);
          });
    }

    verifyIsFollower() {
        this.publicProfileService.getById(this.publicProfileId)
            .pipe(take(1))
            .subscribe(result => {
                this.isFollower = false;
                result.followers.forEach(f => {
                    if (f.id === this.authService.getUser().profile.id) {
                        this.isFollower = true;
                    }
                });
            });
    }


    followPublicProfile() {
        this.publicProfileService.follow(this.publicProfileId)
            .pipe(take(1))
            .subscribe(() => {
                this.isFollower = !this.isFollower;
            });
    }

    unfollowPublicProfile() {
        this.publicProfileService.unfollow(this.publicProfileId)
            .pipe(take(1))
            .subscribe(() => {
                this.isFollower = !this.isFollower;
            });
    }
}
