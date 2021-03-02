import {Role} from './enums/Role.enum';
import {Status} from 'cucumber';
import {Profile} from './profileTO.model';
import {CompetitionTO} from './competitionTO.model';
import {Observable} from 'rxjs';

export class CompetitionMemberTO {
    memberId: string;
    title: string;
    story: string;
    profile: Profile;
    profileAsinc: Observable<Profile>;
    profileId: number;
    role: Role;
    status: Status;
    competitionTO: CompetitionTO;
    meanVote: number;
}
