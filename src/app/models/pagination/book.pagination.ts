import {Book} from '../book.model';
import {PaginationInterface} from './pagination.interface';

export class BookPagination extends PaginationInterface {
    content: Book[];
}
