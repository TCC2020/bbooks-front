import {BookStatus} from './enums/BookStatus.enum';
import {Book} from './book.model';
import {Tag} from './tag';

export class UserBookTO {
    id: number;
    idBookGoogle: string;
    status: BookStatus;
    addDate: Date;
    idBook: number;
    tags: Tag[];
    page: number;
    profileId: number;
}
