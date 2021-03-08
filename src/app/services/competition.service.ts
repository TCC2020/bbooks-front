import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ReadingTrackingTO} from '../models/ReadingTrackingTO.model';
import {Observable} from 'rxjs';
import {CompetitionTO} from '../models/competitionTO.model';
import {CompetitionPagination} from '../models/pagination/competition.pagination';
import {BookPagination} from '../models/pagination/book.pagination';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  api: string = environment.competitionApi + 'competitions/';

  constructor(private http: HttpClient) { }

  search(name: string, page: number, size: number): Observable<CompetitionPagination> {
    const params = new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('size', size.toString());
    return this.http.get<CompetitionPagination>(this.api, {params});
  }
  save(competition: CompetitionTO): Observable<CompetitionTO> {
    return this.http.post<CompetitionTO>(this.api, competition);
  }
  update(competition: CompetitionTO): Observable<CompetitionTO> {
    return this.http.put<CompetitionTO>(this.api + competition.id, competition);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.api + id);
  }

  getById(id: string): Observable<CompetitionTO> {
    return this.http.get<CompetitionTO>(this.api + id);
  }
}
