import {Observable} from 'rxjs';
import {Profile} from './profileTO.model';

export class ReviewTO {
    id: string;
    title: string;
    body: string;
    bookId: number;
    idGoogleBook: string;
    profileId: number;
    creationDate: Date;
    profileTO: Observable<Profile>;
}
