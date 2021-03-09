import {BaseProfileTO} from './BaseProfileTO.model';
import {ReactionType} from './enums/ReactionType.enum';

export class ReactionsByType {
    type: ReactionType;
    profiles: BaseProfileTO[];
    count: number;
}
