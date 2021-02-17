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


@Injectable({
    providedIn: 'root'
})
export class FeedMainManagerService {
    feedState: Observable<IFeedMainState>;

    constructor(
        private store: Store<IFeedMainStateReducer>
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
}
