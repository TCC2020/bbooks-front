import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {PostTO} from '../../../models/PostTO.model';
import {TranslateService} from '@ngx-translate/core';
import {FeedService} from '../../../services/feed.service';
import {FeedPerfilManageService} from '../store/feed-perfil-manage.service';
import {IFeedState} from '../store/state/feed.state.interface';
import {Observable} from 'rxjs';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {FeedGenericService} from '../../../services/feed-generic.service';

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
        private feedPerfilManage: FeedPerfilManageService,
        public feedGenericService: FeedGenericService
    ) {
    }

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
            this.getPosts();
        });
        this.feedRedux$ = this.feedPerfilManage.getFeed();
    }

    onScroll() {
        this.getPosts();
    }

    getPosts(): void {
        if (this.user.id === this.authService.getUser().id) {
            this.loading = true;
            this.postService.getByProfileId(this.authService.getUser().profile.id, 5, this.page)
                .pipe(take(1))
                .subscribe(result => {
                    if (result.content.length === 1) {
                        result.content.shift();
                    }
                    this.loading = false;
                    if (result?.content?.length > 0) {
                        this.page = this.page + 1;
                        this.feedPerfilManage.updatePage(this.page);
                        this.feedPerfilManage.getPostOnRedux(result.content);
                        this.getComments(result.content);
                    }
                });
        } else {
            this.loading = true;
            this.feedService.getPersonFeed(this.user.profile.id, 5, this.page)
                .pipe(take(1))
                .subscribe(result => {
                    if (result.content.length === 1) {
                        result.content.shift();
                    }
                    this.loading = false;
                    if (result?.content?.length > 0) {
                        this.page = this.page + 1;
                        this.feedPerfilManage.updatePage(this.page);
                        this.feedPerfilManage.getPostOnRedux(result.content);
                        this.getComments(result.content);
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.feedPerfilManage.clearRedux();
    }

    getComments(content: PostTO[]): void {
        content.forEach((p) => {
            this.postService.getComment(p.id, 5, 0)
                .pipe(take(1))
                .subscribe(result => {
                    const post = this.feedGenericService.convertToNewPost(p);
                    post.comments = result;
                    this.feedPerfilManage.updatePost(post);
                });
        });
    }
}
