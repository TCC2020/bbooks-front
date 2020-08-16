import {UserBookTO} from "./userBookTO";

export class Tag {
    id: number;
    name: string;
    color: string;
    profileId: number;
    books: UserBookTO[];
}
