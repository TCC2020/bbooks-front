import {Book} from './book.model';
import {BookPagination} from './pagination/book.pagination';
import {BookGoogle} from './bookGoogle.model';

export class BookSearchTO {
    books: BookPagination;
    googleBooks: BookGoogle;
    page: number;
    search: string;
}
