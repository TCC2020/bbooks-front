import {Pageable} from './pageable.pagination';

export class PaginationInterface {
    pageable: Pageable;
    totalPages: number;
    last: boolean;
    size: number;
    totalElements: number;
}
