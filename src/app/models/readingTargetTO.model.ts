import { Observable } from 'rxjs';
import { UserBookTO } from './userBookTO';

export class ReadingTargetTO {
    id: string;
    year: number;
    targets: Observable<UserBookTO>;
    profileId: number;
}
