import {PaginationInterface} from './pagination.interface';
import {PostTO} from '../PostTO.model';

export class PostPagination extends PaginationInterface {
    content: PostTO[];
}

