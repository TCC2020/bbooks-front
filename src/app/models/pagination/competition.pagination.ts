import {PaginationInterface} from './pagination.interface';
import {CompetitionTO} from '../competitionTO.model';

export class CompetitionPagination extends PaginationInterface {
    content: CompetitionTO[];
}
