import {BookStatus} from "./enums/BookStatus.enum";
import {Book} from "./book.model";

export class UserBookTO {
    id: number;
    isbn10: string
    isbn13: string;
    idBook: string;
    status: BookStatus;
    addDate: Date;
    book: Book;
    tagId: number;
    profileId: number;
}
