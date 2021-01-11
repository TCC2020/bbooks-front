import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ReadingTargetTO } from '../models/readingTargetTO.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingTargetService {
  api: string = environment.api + 'reading-targets/';

  constructor(private http: HttpClient) { }

  save(readingTarget: ReadingTargetTO): Observable<ReadingTargetTO> {
    return this.http.post<ReadingTargetTO>(this.api, readingTarget);
  }

  delete(readingTargetId: string): Observable<void> {
      return this.http.delete<void>(this.api + readingTargetId);
  }

  getAllByProfileId(profileId: number): Observable<ReadingTargetTO[]> {
    return this.http.get<ReadingTargetTO[]>(this.api + 'profile/' + profileId);
  }

  getAllById(id: string): Observable<ReadingTargetTO[]> {
    return this.http.get<ReadingTargetTO[]>(this.api + id);
  }

  addTarget(profileId: number, userBookId: number): Observable<ReadingTargetTO[]> {
    return this.http.put<ReadingTargetTO[]>(this.api, {"profileId": profileId,  "userBookId": userBookId});
  }

  removeTarget(profileId: number, userBookId: number): Observable<void> {
    return this.http.delete<void>(this.api + 'delete/profile/' + profileId + '/user-book/' + userBookId);
  }
}
