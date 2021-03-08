import {Role} from './enums/Role.enum';
import {Profile} from './profileTO.model';
import {CompetitionTO} from './competitionTO.model';
import {Observable} from 'rxjs';
import {LiteraryMemberStatus} from './enums/LiteraryMemberStatus.enum';

export class CompetitionMemberTO {
    memberId: string;
    title: string;
    story: string;
    profile: Profile;
    profileAsinc: Observable<Profile>;
    profileId: number;
    role: Role;
    status: LiteraryMemberStatus;
    competitionTO: CompetitionTO;
    meanVote: number;
}
