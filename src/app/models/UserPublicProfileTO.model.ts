import {UserTO} from './userTO.model';
import {List} from '@zxing/library/es2015/customTypings';
import {Profile} from './profileTO.model';

export class UserPublicProfileTO {
    id: string;
    name: string;
    description: string;
    user: UserTO;
    createdAt: Date;
    followers: List<Profile>;
}
