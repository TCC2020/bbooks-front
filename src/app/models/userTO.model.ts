import {Profile} from './profileTO.model';

export class UserTO {
    id: string;
    userName: string;
    email: string;
    password: string;
    token: string;
    idToken: string;
    idSocial: string;
    verified: boolean;
    profile: Profile;
}
