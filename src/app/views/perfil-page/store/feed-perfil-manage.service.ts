import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IFeedState, IFeedStateReducer} from './state/feed.state.interface';
import {Observable} from 'rxjs';
import {PostTO} from '../../../models/PostTO.model';
import {AddPost, ClearRedux, DeletePost, GetPosts, UpdatePage, UpdatePost} from './actions/feed.actions';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {PostReactionTO} from '../../../models/PostReactionTO.model';
import {UpdatePostFeedMain} from '../../feed-page/store/actions/feed-main.actions';


@Injectable({
    providedIn: 'root'
})
export class FeedPerfilManageService {
    feedState: Observable<IFeedState>;

    constructor(
        private store: Store<IFeedStateReducer>,
        public feedGenericService: FeedGenericService
    ) {
        this.feedState = this.store.select(
            'feedProfile'
        );
    }

    getFeed(): Observable<IFeedState> {
        return this.feedState;
    }

    savePostOnRedux(postTO: PostTO): void {
        this.store.dispatch(new AddPost(postTO));
    }

    getPostOnRedux(posts: PostTO[]): void {
        this.store.dispatch(new GetPosts(posts));
    }

    updatePage(page: number): void {
        this.store.dispatch(new UpdatePage(page));
    }

    deletePost(post: PostTO): void {
        this.store.dispatch(new DeletePost(post));
    }

    updatePost(post: PostTO): void {
        this.store.dispatch(new UpdatePost(post));
    }

    clearRedux(): void {
        this.store.dispatch(new ClearRedux());
    }

    addComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = [...post.comments, comment];
        this.store.dispatch(new UpdatePost(post));
    }
    updateComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.map(r => r.id !== comment.id ? r : comment);
        this.store.dispatch(new UpdatePost(post));
    }

    deleteComment(p: PostTO, comment: PostTO): void {
        const post = this.feedGenericService.convertToNewPost(p);
        post.comments = p.comments.filter(c => c.id !== comment.id);
        this.store.dispatch(new UpdatePost(post));
    }

    updateReactions(postTo: PostTO, postReactionTO: PostReactionTO) {
        const post = this.feedGenericService.convertToNewPost(postTo);
        post.reactions = postReactionTO.reactions;
        this.store.dispatch(new UpdatePostFeedMain(post));
    }
}
