import {ReadingTrackingTO} from './ReadingTrackingTO.model';

export class TrackingTO {
    id: string;
    comentario: string;
    creationDate: Date;
    finishedDate: Date;
    trackings: ReadingTrackingTO[];
    userBookId: number;
}
