import {Injectable} from '@angular/core';
import {PostTO} from '../models/PostTO.model';

@Injectable({
    providedIn: 'root'
})
export class FeedGenericService {

    constructor() {
    }

    public convertToNewPost(p: PostTO): PostTO {
        const post = new PostTO();
        post.id = p.id;
        post.user = p.user;
        post.tipoPost = p.tipoPost;
        post.creationDate = p.creationDate;
        post.description = p.description;
        post.privacy = p.privacy;
        post.image = p.image;
        post.profileId = post.profileId;
        post.comments = [];
        if (p.comments) {
            post.comments = p.comments.map(result => result);
        }
        return post;
    }
}
