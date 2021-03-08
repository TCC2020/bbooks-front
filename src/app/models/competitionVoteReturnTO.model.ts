import {CompetitionMemberTO} from './competitionMemberTO.model';
import {Profile} from './profileTO.model';


export class CompetitionVoteReturnTO {
    id: string;
    value: number;
    member: CompetitionMemberTO;
    profile: Profile;
}
