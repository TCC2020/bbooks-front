import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {FeedMainManagerService} from '../store/feed-main-manager.service';
import {Observable} from 'rxjs';
import {IFeedMainState} from '../store/state/feed-main.state';
import {take} from 'rxjs/operators';
import {FeedService} from '../../../services/feed.service';
import {PostTO} from '../../../models/PostTO.model';
import {PostService} from '../../../services/post.service';
import {FeedGenericService} from '../../../services/feed-generic.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    user: UserTO;
    typePostControler = TypePostControler;
    feedRedux$: Observable<IFeedMainState>;
    loading = false;
    page = 0;

    constructor(
        private authService: AuthService,
        public feedMainManagerService: FeedMainManagerService,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService
    ) {
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.getPosts();
        this.feedRedux$ = this.feedMainManagerService.getFeed();
    }

    onScroll(): void {
        this.getPosts();
    }

    getPosts(): void {
        this.loading = true;
        this.feedService.getFeed(5, this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                this.feedMainManagerService.updatePage(this.page);
                this.feedMainManagerService.getPostOnRedux(result);
                this.getComments(result);
            });
    }

    ngOnDestroy(): void {
        this.feedMainManagerService.clearRedux();
    }
    getComments(content: PostTO[]): void {
        content.forEach((p) => {
            this.postService.getComment(p.id, 5, 0)
                .pipe(take(1))
                .subscribe(result => {
                    const post = this.feedGenericService.convertToNewPost(p);
                    post.comments = result;
                    this.feedMainManagerService.updatePost(post);
                });
        });
    }
}
