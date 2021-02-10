import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../../shared/post-dialog/post-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {PostTO} from '../../../models/PostTO.model';
import {Util} from '../../shared/Utils/util';
import {TranslateService} from '@ngx-translate/core';
import {FeedService} from '../../../services/feed.service';
import {FeedPerfilManageService} from '../store/feed-perfil-manage.service';
import {IFeedState, IFeedStateReducer} from '../store/state/feed.state.interface';
import {Observable} from 'rxjs';
import {TypePostControler} from '../../../models/enums/TypePost.enum';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
    user: UserTO;
    page = 0;
    loading = false;
    feedRedux$: Observable<IFeedState>;
    typePostControler = TypePostControler;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
        public postService: PostService,
        public translate: TranslateService,
        public feedService: FeedService,
        private feedPerfilManage: FeedPerfilManageService
    ) {
    }

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
            this.getPosts();
        });
        this.feedRedux$ = this.feedPerfilManage.getFeed();
    }

    openPost(post?: PostTO) {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.router.navigate([this.user.userName + '/create-post'], {state: {post}});
        } else {
            this.openPostDialog(post);
        }
    }

    openPostDialog(post?: PostTO) {
        const dialogRef = this.dialog.open(PostDialogComponent, {
            height: '450px',
            width: '500px',
            data: post
        });
        dialogRef.afterClosed()
            .pipe().subscribe((res) => {
            if (res) {
                if (post) {

                } else {
                    this.feedPerfilManage.savePostOnRedux(res);
                }
            }
        });
    }

    onScroll() {
       this.getPosts();
    }

    onListPostsChange(event) {
        // if (event.save) {
        //     const index = this.posts.indexOf(event.p);
        //     this.posts[index].description = event.post.description;
        // } else {
        //     this.posts.splice(event.post, 1);
        // }
    }

    getPosts(): void {
        if (this.user.id === this.authService.getUser().id) {
            this.loading = true;
            this.postService.getByProfileId(this.authService.getUser().profile.id, 5, this.page)
                .pipe(take(1))
                .subscribe(result => {
                    this.loading = false;
                    if (result.content.length > 0) {
                        this.page = result.pageable.pageNumber + 1;
                        this.feedPerfilManage.updatePage(this.page);
                        this.feedPerfilManage.getPostOnRedux(result.content);
                    }
                });
        } else {
            this.loading = true;
            this.feedService.getPersonFeed(this.user.profile.id, 5, this.page)
                .pipe(take(1))
                .subscribe(result => {
                    this.loading = false;
                    if (result.content.length > 0) {
                        this.page = result.pageable.pageNumber + 1;
                        this.feedPerfilManage.updatePage(this.page );
                        this.feedPerfilManage.getPostOnRedux(result.content);
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.feedPerfilManage.clearRedux();
    }


}
