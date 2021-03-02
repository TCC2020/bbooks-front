import {PostTO} from '../../../../models/PostTO.model';

export enum FeedGroupActionsType {
    addPost = '[Posts] Add Post',
    updatePost = '[Posts] Update Post',
    deletePost = '[Posts] Delete Post',
    getPosts = '[Posts] Get list post pagination',
    updatePage = '[Page] Update page pagination',
    clearRedux = '[Clear] Clear redux'
}

export class AddPostFeedGroup {
    readonly type = FeedGroupActionsType.addPost;
    constructor(public payload: PostTO) {}
}

export class UpdatePostFeedGroup  {
    readonly type = FeedGroupActionsType.updatePost;
    constructor(public payload: PostTO) {}
}
export class DeletePostFeedGroup  {
    readonly type = FeedGroupActionsType.deletePost;
    constructor(public payload: PostTO) {}
}

export class GetPostsFeedGroup  {
    readonly type = FeedGroupActionsType.getPosts;
    constructor(public payload: PostTO[]) {}
}
export class UpdatePageFeedGroup  {
    readonly type = FeedGroupActionsType.updatePage;
    constructor(public payload: number) {}
}
export class ClearReduxFeedGroup  {
    readonly type = FeedGroupActionsType.clearRedux;
    constructor(public payload?) {}
}
