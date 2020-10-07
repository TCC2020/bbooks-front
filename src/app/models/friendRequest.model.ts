import {Profile} from './profileTO.model';

export class FriendRequest {
    id: number;
    status: string;
    addDate: Date;
    profileTO: Profile;
}

