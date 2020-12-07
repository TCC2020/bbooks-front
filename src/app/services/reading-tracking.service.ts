import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReadingTrackingTO} from '../models/ReadingTrackingTO.model';

@Injectable({
    providedIn: 'root'
})
export class ReadingTrackingService {
    api: string = environment.api + 'tracking/';

    constructor(private http: HttpClient) {
    }

    save(readingTracking: ReadingTrackingTO): Observable<ReadingTrackingTO> {
        return this.http.post<ReadingTrackingTO>(this.api, readingTracking);
    }
    update(readingTracking: ReadingTrackingTO): Observable<ReadingTrackingTO> {
        return this.http.put<ReadingTrackingTO>(this.api + readingTracking.id, readingTracking);
    }
    delete(trackingid: string): Observable<void> {
        return this.http.delete<void>(this.api + trackingid);
    }

    getAllByUserBook(idUserBook: number): Observable<ReadingTrackingTO[]> {
        return this.http.get<ReadingTrackingTO[]>(this.api + 'book/' + idUserBook);
    }
}
