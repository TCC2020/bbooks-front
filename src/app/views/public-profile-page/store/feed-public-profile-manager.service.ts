import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PostTO} from '../../../models/PostTO.model';
import {IPublicProfilePageState, IPublicProfilePageStateReducer} from './state/feed-public-profile.state';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {
    AddPostPublicProfilePage, ClearReduxPublicProfilePage,
    DeletePostPublicProfilePage,
    GetPostsPublicProfilePage,
    UpdatePagePublicProfilePage, UpdatePostPublicProfilePage
} from './actions/feed-public-profile.actions';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';
import {PostReactionTO} from '../../../models/PostReactionTO.model';
import {UpdatePostFeedMain} from '../../feed-page/store/actions/feed-main.actions';

@Injectable({
    providedIn: 'root'
})
export class FeedPublicProfilePageManagerService {
    feedState: Observable<IPublicProfilePageState>;

    constructor(
        private store: Store<IPublicProfilePageStateReducer>,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService
    ) {
        this.feedState = this.store.select(
            'PublicProfilePage'
        );
    }

    getFeed(): Observable<IPublicProfilePageState> {
        return this.feedState;
    }

    savePostOnRedux(postTO: PostTO): void {
        this.store.dispatch(new AddPostPublicProfilePage(postTO));
    }

    getPostOnRedux(posts: PostTO[]): void {
        this.store.dispatch(new GetPostsPublicProfilePage(posts));
    }

    updatePage(page: number): void {
        this.store.dispatch(new UpdatePagePublicProfilePage(page));
    }
    deletePost(post: PostTO): void {
        this.store.dispatch(new DeletePostPublicProfilePage(post));
    }
    updatePost(post: PostTO): void {
        this.store.dispatch(new UpdatePostPublicProfilePage(post));
    }
    clearRedux() {
        this.store.dispatch(new ClearReduxPublicProfilePage());
    }

    addComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = [...post.comments, comment];
        this.store.dispatch(new UpdatePostPublicProfilePage(post));
    }
    updateComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.map(r => r.id !== comment.id ? r : comment);
        this.store.dispatch(new UpdatePostPublicProfilePage(post));
    }

    deleteComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.filter(c => c.id !== comment.id);
        this.store.dispatch(new UpdatePostPublicProfilePage(post));
    }

    updateReactions(postTo: PostTO, postReactionTO: PostReactionTO) {
        const post = this.feedGenericService.convertToNewPost(postTo);
        post.reactions = postReactionTO.reactions;
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
}
