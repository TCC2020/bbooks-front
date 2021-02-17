import {PostTO} from '../../../../models/PostTO.model';
import {FeedActionsType} from '../../../perfil-page/store/actions/feed.actions';

export enum FeedMainActionsType {
    addPost = '[Posts] Add Post',
    updatePost = '[Posts] Update Post',
    deletePost = '[Posts] Delete Post',
    getPosts = '[Posts] Get list post pagination',
    updatePage = '[Page] Update page pagination',
    clearRedux = '[Clear] Clear redux'
}

export class AddPostFeedMain {
    readonly type = FeedActionsType.addPost;
    constructor(public payload: PostTO) {}
}

export class UpdatePostFeedMain  {
    readonly type = FeedActionsType.updatePost;
    constructor(public payload: PostTO) {}
}
export class DeletePostFeedMain  {
    readonly type = FeedActionsType.deletePost;
    constructor(public payload: PostTO) {}
}

export class GetPostsFeedMain  {
    readonly type = FeedActionsType.getPosts;
    constructor(public payload: PostTO[]) {}
}
export class UpdatePageFeedMain  {
    readonly type = FeedActionsType.updatePage;
    constructor(public payload: number) {}
}
export class ClearReduxFeedMain  {
    readonly type = FeedActionsType.clearRedux;
    constructor(public payload?) {}
}
