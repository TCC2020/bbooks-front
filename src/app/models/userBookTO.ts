import {BookStatus} from "./enums/BookStatus.enum";
import {Book} from "./book.model";
import {Tag} from "./tag";

export class UserBookTO {
    id: number;
    isbn10: string
    isbn13: string;
    idBook: string;
    status: BookStatus;
    addDate: Date;
    book: Book;
    tags: Tag[];
    profileId: number;
}
