import {Component, OnDestroy, OnInit} from '@angular/core';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FeedGroupManagerService} from '../store/feed-group-manager.service';
import {Observable} from 'rxjs';
import {IFeedGroupState} from '../store/state/feed-group.state';
import {take} from 'rxjs/operators';
import {PostTO} from '../../../models/PostTO.model';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {PostPagination} from '../../../models/pagination/post.pagination';

@Component({
    selector: 'app-feed-group',
    templateUrl: './feed-group.component.html',
    styleUrls: ['./feed-group.component.scss']
})
export class FeedGroupComponent implements OnInit, OnDestroy {
    typePostControler = TypePostControler;
    feedRedux$: Observable<IFeedGroupState>;
    loading = false;
    page = 0;

    constructor(
        public authService: AuthService,
        public router: Router,
        public feedGroupManagerService: FeedGroupManagerService,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService
    ) {
    }

    ngOnInit(): void {
        this.getPosts();
        this.feedRedux$ = this.feedGroupManagerService.getFeed();
    }

    getPosts(): void {
        this.loading = true;
        this.feedService.getFeed(5, this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                this.feedGroupManagerService.updatePage(this.page);
                this.feedGroupManagerService.getPostOnRedux(result);
                this.getComments(result);
            });
    }

    ngOnDestroy(): void {
        this.feedGroupManagerService.clearRedux();
    }

    getComments(content: PostTO[]): void {
        content.forEach((p) => {
            this.postService.getComment(p.id, 5, 0)
                .pipe(take(1))
                .subscribe(result => {
                    const post = this.feedGenericService.convertToNewPost(p);
                    post.comments = result;
                    this.feedGroupManagerService.updatePost(post);
                });
        });
    }

    updateRedux(result: PostPagination): void {
        if (result?.content?.length > 0) {
            this.page = this.page + 1;
            this.feedGroupManagerService.updatePage(this.page);
            this.feedGroupManagerService.getPostOnRedux(result.content);
            this.getComments(result.content);
        }
    }

}
