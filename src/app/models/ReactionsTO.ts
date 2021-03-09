import {ReactionsByType} from './ReactionsByType.model';
import {ReactionType} from './enums/ReactionType.enum';

export class ReactionsTO {
    count: number;
    likes: ReactionsByType;
    dislike: ReactionsByType;
    loved: ReactionsByType;
    hilarius: ReactionsByType;
    surprised: ReactionsByType;
    sad: ReactionsByType;
    hated: ReactionsByType;
    actorAction: ActorAction;
}
export class ActorAction {
    reactionType: ReactionType;
}
