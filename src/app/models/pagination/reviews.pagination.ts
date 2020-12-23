import {PaginationInterface} from './pagination.interface';
import {ReviewTO} from '../ReviewTO.model';

export class ReviewsPagination extends PaginationInterface {
    content: ReviewTO[];
}
