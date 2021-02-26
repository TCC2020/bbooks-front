import {Role} from './enums/Role.enum';
import {Status} from 'cucumber';
import {Profile} from './profileTO.model';
import {CompetitionTO} from './competitionTO.model';

export class CompetitionMemberTO {
    numberId: string;
    title: string;
    story: string;
    profile: Profile;
    role: Role;
    status: Status;
    competitionTO: CompetitionTO;
    meanVote: number;
}
