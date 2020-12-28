import {Book} from './book.model';

export class BookSearchTO {
    books: Book;
    googleBooks: Map<any, any>;
    page: number;
    search: string;
}
