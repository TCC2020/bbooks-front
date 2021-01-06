import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../../shared/post-dialog/post-dialog.component';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
    user: UserTO;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });
    }

    openPost() {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.router.navigate([this.user.userName + '/create-post']);
        } else {
            this.openPostDialog();
        }
    }
    openPostDialog() {
        const dialogRef = this.dialog.open(PostDialogComponent, {
            height: '450px',
            width: '500px',
        });
        dialogRef.afterClosed()
            .pipe().subscribe((res) => {
        });
    }
}
