import {PaginationInterface} from './pagination.interface';
import {CompetitionMemberTO} from '../competitionMemberTO.model';

export class CompetitionMemberPagination extends PaginationInterface {
    content: CompetitionMemberTO[];
}
