import {TypePost} from './enums/TypePost.enum';
import {PostPrivacy} from './enums/PostPrivacy.enum';

export class PostTO {
    id: number;
    profileId: number;
    description: string;
    image: string;
    tipoPost: TypePost;
    comments: PostTO[];
    privacy: PostPrivacy;
    creationDate: Date;
}
