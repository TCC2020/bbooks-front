import {VoteTO} from './VoteTO.model';

export class SurveyOptionsTO {
    id: string;
    option: string;
    votes: VoteTO[];
}
