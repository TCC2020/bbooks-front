import {Book} from '../book.model';
import {Pageable} from './pageable.pagination';

export class BookPagination {
    content: Book[];
    pageable: Pageable;
    totalPages: number;
    last: boolean;
    size: number;
    totalElements: number;
}
