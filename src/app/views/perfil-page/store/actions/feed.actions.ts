import {PostTO} from '../../../../models/PostTO.model';

export enum FeedActionsType {
    addPost = '[Posts] Add Post',
    updatePost = '[Posts] Update Post',
    deletePost = '[Posts] Delete Post',
    getPosts = '[Posts] Get list post pagination',
    updatePage = '[Page] Update page pagination',
    addComment = '[Comment] Add Comment',
    deleteComment = '[Comment] Delete Comment',
    updateComment = '[Comment] Update Comment',
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

export class DeleteComment {
    readonly type = FeedActionsType.deleteComment;
    constructor(public payload: PostTO) {}
}

export class AddComment {
    readonly type = FeedActionsType.addComment;
    constructor(public payload: PostTO) {}
}

export class UpdateComment {
    readonly type = FeedActionsType.updateComment;
    constructor(public payload: PostTO) {}
}


