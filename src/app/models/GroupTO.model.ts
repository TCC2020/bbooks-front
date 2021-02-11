import {PostPrivacy} from './enums/PostPrivacy.enum';

export class GroupTO {
    id: string;
    userId: string;
    name: string;
    description: string;
    privacy: PostPrivacy;
    creationDate: Date;
}
