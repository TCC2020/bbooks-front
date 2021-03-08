import { ReadingTargetProgressTO } from './ReadingTargetProgressTO.model';
import { UserBookTO } from './userBookTO';

export class ReadingTargetTO {
    id: string;
    year: number;
    targets: UserBookTO[];
    profileId: number;
    progress: ReadingTargetProgressTO;
}
