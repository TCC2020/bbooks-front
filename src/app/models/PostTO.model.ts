import {TypePost} from './enums/TypePost.enum';
import {PostPrivacy} from './enums/PostPrivacy.enum';
import {UserTO} from './userTO.model';

export class PostTO {
    id: string;
    profileId: number;
    description: string;
    image: string;
    tipoPost: TypePost;
    comments: PostTO[];
    privacy: PostPrivacy;
    creationDate: Date;
    user: UserTO;
}
