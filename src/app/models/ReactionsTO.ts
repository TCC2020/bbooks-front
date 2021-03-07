import {ReactionsByType} from './ReactionsByType.model';

export class ReactionsTO {
    count: number;
    likes: ReactionsByType;
    dislike: ReactionsByType;
    loved: ReactionsByType;
    hilarius: ReactionsByType;
    surprised: ReactionsByType;
    sad: ReactionsByType;
    hated: ReactionsByType;
}
