import {Component, Input, OnInit} from '@angular/core';
import {UserTO} from '../../../models/userTO.model';
import {PostTO} from '../../../models/PostTO.model';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {FeedPerfilManageService} from '../../perfil-page/store/feed-perfil-manage.service';
import {AuthService} from '../../../services/auth.service';
import {FeedMainManagerService} from '../../feed-page/store/feed-main-manager.service';
import {FeedGroupManagerService} from '../../groups/store/feed-group-manager.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

    @Input() user: UserTO;
    @Input() typePostControler: TypePostControler;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        public postService: PostService,
        private feedPerfilManageService: FeedPerfilManageService,
        public authService: AuthService,
        public feedMainManagerService: FeedMainManagerService,
        public feedGroupManagerService: FeedGroupManagerService
    ) {
    }

    ngOnInit(): void {
    }

    openPost() {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.redirectRouterPost();
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
            if (res) {
                this.saveReduxOfTypePost(this.typePostControler, res);
            }
        });
    }

    saveReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.savePostOnRedux(postTo);
                return;
            case TypePostControler.group:
                this.feedGroupManagerService.savePostOnRedux(postTo);
                return;
        }
    }

    redirectRouterPost() {
        switch (this.typePostControler) {
            case TypePostControler.feed:
                this.router.navigate(['feed/create-post'], {state: {}});
                return;
            case TypePostControler.feedPerfil:
                this.router.navigate([this.user.userName + '/create-post', {state: {}}]);
                return;
            case TypePostControler.group:
                this.router.navigate(['groups/create-post'], {state: {}});
                return;
        }
    }
}
