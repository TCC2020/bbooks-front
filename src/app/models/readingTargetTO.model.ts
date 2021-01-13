import { UserBookTO } from './userBookTO';

export class ReadingTargetTO {
    id: string;
    year: number;
    targets: UserBookTO[];
    profileId: number;
}
