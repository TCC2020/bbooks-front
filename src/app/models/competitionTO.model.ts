import {CompetitionMemberTO} from './competitionMemberTO.model';

export class CompetitionTO {
    id: string;
    title: string;
    rules: string;
    finalDate: Date;
    subscriptionDate: Date;
    subscriptionFinalDate: Date;
    creationDate: Date;
    winnerProfile: CompetitionMemberTO;
    creatorProfile: number;
}
