import {UserBookTO} from "./userBookTO";

export class Tag {
    id: number;
    name: string;
    color: string;
    profile: any;
    books: UserBookTO[];
}
