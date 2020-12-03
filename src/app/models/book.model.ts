import {Author} from './author.model';
import {BookStatus} from './enums/BookStatus.enum';
import {Tag} from './tag';

export class Book {
    id: string;
    isbn10: string;
    isbn13: string;
    title: string;
    authors: Author[];
    numberPage: number;
    language: string;
    publisher: string;
    // country: number;
    publishedDate: number;
    averageRating: number;
    image: string;
    description: string;
    status: BookStatus;
    idUserBook: number;
    tags: Tag[];
    api: string;
}
