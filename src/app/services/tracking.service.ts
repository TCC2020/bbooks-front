import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReadingTrackingTO} from '../models/ReadingTrackingTO.model';
import {Observable} from 'rxjs';
import {TrackingTO} from '../models/TrackingTO.model';

@Injectable({
    providedIn: 'root'
})
export class TrackingService {

    api: string = environment.api + 'tracking-group/';

    constructor(private http: HttpClient) {
    }

    save(trackingTO: TrackingTO): Observable<ReadingTrackingTO> {
        return this.http.post<ReadingTrackingTO>(this.api, trackingTO);
    }

    getAllByUserBook(idUserBook: number): Observable<TrackingTO[]> {
        return this.http.get<TrackingTO[]>(this.api + 'book/' + idUserBook);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(this.api + id);
    }
    update(trackingTO: TrackingTO): Observable<ReadingTrackingTO> {
        return this.http.put<ReadingTrackingTO>(this.api + trackingTO.id, trackingTO);
    }

    getById(id: string): Observable<TrackingTO> {
        return this.http.get<TrackingTO>(this.api + id);
    }
}
