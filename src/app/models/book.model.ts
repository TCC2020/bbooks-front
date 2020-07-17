import {Author} from "./author.model";

export class Book {
    id: string;
    isbn10: string;
    title: string;
    authors: Author[];
    numberPage: number;
    language: string;
    publisher: string;
    // country: number;
    publishedDate: number;
    averageRating: number;
    image: string;
    description: string;
}
