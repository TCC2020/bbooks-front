import {Component, OnDestroy, OnInit} from '@angular/core';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {Observable} from 'rxjs';
import {IPublicProfilePageState} from '../store/state/feed-public-profile.state';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {TranslateService} from '@ngx-translate/core';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {FeedPublicProfilePageManagerService} from '../store/feed-public-profile-manager.service';
import {map, take} from 'rxjs/operators';
import {PostTO} from '../../../models/PostTO.model';
import {ActivatedRoute} from '@angular/router';
import {PostPagination} from '../../../models/pagination/post.pagination';
import {PublicProfileService} from '../../../services/public-profile.service';
import {UserPublicProfileTO} from '../../../models/UserPublicProfileTO.model';

@Component({
    selector: 'app-feed-public-profile',
    templateUrl: './feed-public-profile.component.html',
    styleUrls: ['./feed-public-profile.component.scss']
})
export class FeedPublicProfileComponent implements OnInit, OnDestroy {
    typePostControler = TypePostControler;
    feedRedux$: Observable<IPublicProfilePageState>;
    user: UserTO;
    loading = false;
    publicProfileId: string;
    page = 0;
    publicProfileTO: UserPublicProfileTO;
    isOwner = false;

    constructor(
        public authService: AuthService,
        private translate: TranslateService,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService,
        public feedPublicProfilePageManagerService: FeedPublicProfilePageManagerService,
        public route: ActivatedRoute,
        private publicProfileService: PublicProfileService,
    ) {
        this.feedPublicProfilePageManagerService.clearRedux();
    }

    ngOnInit(): void {
        this.route.parent.params
            .pipe(
                map(params => params.id)
            )
            .subscribe(result => {
                    this.publicProfileId = result;
                    localStorage.setItem('pageId', result);
                    this.getPosts();
                    this.getPublicProfileById(result);
                }
            );
        this.user = this.authService.getUser();
        this.feedRedux$ = this.feedPublicProfilePageManagerService.getFeed();
    }

    onScroll() {
        this.getPosts();
    }

    getPosts(): void {
        this.loading = true;
        this.postService.getPageFeed(this.publicProfileId, 5 , this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length === 1) {
                    this.feedRedux$.pipe(take((1))).subscribe(feed => {
                        if (feed[0]?.id === result?.content[0]?.id) {
                            result.content.shift();
                        }
                        this.updateRedux(result);
                    });
                } else {
                    this.updateRedux(result);
                }
            });
    }

    ngOnDestroy(): void {
        this.feedPublicProfilePageManagerService.clearRedux();
    }

    updateRedux(result: PostPagination): void {
        if (result?.content?.length > 0) {
            this.page = this.page + 1;
            this.feedPublicProfilePageManagerService.updatePage(this.page);
            this.feedPublicProfilePageManagerService.getPostOnRedux(result.content);
            this.getComments(result.content);
        }
    }

    getComments(content: PostTO[]): void {
        content.forEach((p) => {
            this.postService.getComment(p.id, 5, 0)
                .pipe(take(1))
                .subscribe(result => {
                    const post = this.feedGenericService.convertToNewPost(p);
                    post.comments = result;
                    this.feedPublicProfilePageManagerService.updatePost(post);
                });
        });
    }
    getPublicProfileById(idPublic: string) {
        this.publicProfileService.getById(idPublic)
            .pipe(take(1))
            .subscribe(result => {
                this.publicProfileTO = result;
                if (this.publicProfileTO.user.id === this.authService.getUser().id) {
                    this.isOwner = true;
                }
                localStorage.setItem('namePage', result.name);
            }, error => {
                console.log(error);
            });
    }

}
