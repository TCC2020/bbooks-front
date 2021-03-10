import {PostTO} from '../../../../models/PostTO.model';

export enum PublicProfilePageActionsType {
    addPost = '[Posts] Add Post',
    updatePost = '[Posts] Update Post',
    deletePost = '[Posts] Delete Post',
    getPosts = '[Posts] Get list post pagination',
    updatePage = '[Page] Update page pagination',
    clearRedux = '[Clear] Clear redux'
}

export class AddPostPublicProfilePage {
    readonly type = PublicProfilePageActionsType.addPost;
    constructor(public payload: PostTO) {}
}

export class UpdatePostPublicProfilePage  {
    readonly type = PublicProfilePageActionsType.updatePost;
    constructor(public payload: PostTO) {}
}
export class DeletePostPublicProfilePage  {
    readonly type = PublicProfilePageActionsType.deletePost;
    constructor(public payload: PostTO) {}
}

export class GetPostsPublicProfilePage  {
    readonly type = PublicProfilePageActionsType.getPosts;
    constructor(public payload: PostTO[]) {}
}
export class UpdatePagePublicProfilePage  {
    readonly type = PublicProfilePageActionsType.updatePage;
    constructor(public payload: number) {}
}
export class ClearReduxPublicProfilePage  {
    readonly type = PublicProfilePageActionsType.clearRedux;
    constructor(public payload?) {}
}
