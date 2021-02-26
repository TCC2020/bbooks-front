import {Role} from './enums/Role.enum';
import {Status} from 'cucumber';

export class CompetitionMemberSaveTO {
    memberId: string;
    title: string;
    story: string;
    profileId: number;
    role: Role;
    status: Status;
    competitionId: string;
}
