import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PostTO} from '../../../models/PostTO.model';
import {IFeedMainState, IFeedMainStateReducer} from './state/feed-main.state';
import {
    AddPostFeedMain, ClearReduxFeedMain,
    DeletePostFeedMain,
    GetPostsFeedMain,
    UpdatePageFeedMain,
    UpdatePostFeedMain
} from './actions/feed-main.actions';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {PostReactionTO} from '../../../models/PostReactionTO.model';


@Injectable({
    providedIn: 'root'
})
export class FeedMainManagerService {
    feedState: Observable<IFeedMainState>;

    constructor(
        private store: Store<IFeedMainStateReducer>,
        public feedGenericService: FeedGenericService


    ) {
        this.feedState = this.store.select(
            'feed'
        );
    }

    getFeed(): Observable<IFeedMainState> {
        return this.feedState;
    }

    savePostOnRedux(postTO: PostTO): void {
        this.store.dispatch(new AddPostFeedMain(postTO));
    }

    getPostOnRedux(posts: PostTO[]): void {
        this.store.dispatch(new GetPostsFeedMain(posts));
    }

    updatePage(page: number): void {
        this.store.dispatch(new UpdatePageFeedMain(page));
    }
    deletePost(post: PostTO): void {
        this.store.dispatch(new DeletePostFeedMain(post));
    }
    updatePost(post: PostTO): void {
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
    clearRedux() {
        this.store.dispatch(new ClearReduxFeedMain());
    }

    addComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = [...post.comments, comment];
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
    updateComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.map(r => r.id !== comment.id ? r : comment);
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
    updateReactions(p: PostTO, postReactionTO: PostReactionTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.reactions = postReactionTO.reactions;
        this.store.dispatch(new UpdatePostFeedMain(post));
    }

    deleteComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.filter(c => c.id !== comment.id);
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
}
