import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PostTO} from '../../../models/PostTO.model';
import {IFeedGroupState, IFeedGroupStateReducer} from './state/feed-group.state';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {
    AddPostFeedGroup, ClearReduxFeedGroup,
    DeletePostFeedGroup,
    GetPostsFeedGroup,
    UpdatePageFeedGroup, UpdatePostFeedGroup
} from './actions/feed-group.actions';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';





@Injectable({
    providedIn: 'root'
})
export class FeedGroupManagerService {
    feedState: Observable<IFeedGroupState>;

    constructor(
        private store: Store<IFeedGroupStateReducer>,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService
    ) {
        this.feedState = this.store.select(
            'feed'
        );
    }

    getFeed(): Observable<IFeedGroupState> {
        return this.feedState;
    }

    savePostOnRedux(postTO: PostTO): void {
        this.store.dispatch(new AddPostFeedGroup(postTO));
    }

    getPostOnRedux(posts: PostTO[]): void {
        this.store.dispatch(new GetPostsFeedGroup(posts));
    }

    updatePage(page: number): void {
        this.store.dispatch(new UpdatePageFeedGroup(page));
    }
    deletePost(post: PostTO): void {
        this.store.dispatch(new DeletePostFeedGroup(post));
    }
    updatePost(post: PostTO): void {
        this.store.dispatch(new UpdatePostFeedGroup(post));
    }
    clearRedux() {
        this.store.dispatch(new ClearReduxFeedGroup());
    }

    addComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = [...post.comments, comment];
        this.store.dispatch(new UpdatePostFeedGroup(post));
    }
    updateComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.map(r => r.id !== comment.id ? r : comment);
        this.store.dispatch(new UpdatePostFeedGroup(post));
    }

    deleteComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.filter(c => c.id !== comment.id);
        this.store.dispatch(new UpdatePostFeedGroup(post));
    }
}
