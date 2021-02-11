import {PaginationInterface} from './pagination.interface';
import {GroupTO} from '../GroupTO.model';

export class GroupPagination extends PaginationInterface {
    content: GroupTO[];
}
