import {PostTO} from '../../../../models/PostTO.model';

export enum FeedActionsType {
    addPost = '[Posts] Add Post',
    updatePost = '[Posts] Update Post',
    deletePost = '[Posts] Delete Post',
    getPosts = '[Posts] Get list post pagination',
    updatePage = '[Page] Update page pagination',
    clearRedux = '[Clear] Clear redux'
}

export class AddPost {
    readonly type = FeedActionsType.addPost;
    constructor(public payload: PostTO) {}
}

export class UpdatePost {
    readonly type = FeedActionsType.updatePost;
    constructor(public payload: PostTO) {}
}
export class DeletePost {
    readonly type = FeedActionsType.deletePost;
    constructor(public payload: PostTO) {}
}

export class GetPosts {
    readonly type = FeedActionsType.getPosts;
    constructor(public payload: PostTO[]) {}
}
export class UpdatePage {
    readonly type = FeedActionsType.updatePage;
    constructor(public payload: number) {}
}
export class ClearRedux {
    readonly type = FeedActionsType.clearRedux;
    constructor(public payload?) {}
}

