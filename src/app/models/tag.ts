import {UserBookTO} from "./userBookTO";

export class Tag {
    id: number;
    name: string;
    profileId: number;
    books: UserBookTO[];
}
