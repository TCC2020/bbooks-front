import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IFeedState, IFeedStateReducer} from './state/feed.state.interface';
import {Observable} from 'rxjs';
import {PostTO} from '../../../models/PostTO.model';
import {AddPost, ClearRedux, DeletePost, GetPosts, UpdatePage, UpdatePost} from './actions/feed.actions';


@Injectable({
    providedIn: 'root'
})
export class FeedPerfilManageService {
    feedState: Observable<IFeedState>;

    constructor(
        private store: Store<IFeedStateReducer>
    ) {
        this.feedState = this.store.select(
            'feed'
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
    clearRedux() {
        this.store.dispatch(new ClearRedux());
    }
}
