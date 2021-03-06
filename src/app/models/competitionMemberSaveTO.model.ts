import {Role} from './enums/Role.enum';
import {Status} from 'cucumber';
import {LiteraryMemberStatus} from './enums/LiteraryMemberStatus.enum';

export class CompetitionMemberSaveTO {
    memberId: string;
    title: string;
    story: string;
    profileId: number;
    role: Role;
    status: LiteraryMemberStatus;
    competitionId: string;
}
