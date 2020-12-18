import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookRecommendationTO } from '../models/bookRecommendationTO.model';

@Injectable({
  providedIn: 'root'
})
export class BookRecommendationService {
  api: string = environment.api + 'book-recommendation/';

  constructor(private http: HttpClient) { }

  save(bookRecommendation: BookRecommendationTO): Observable<BookRecommendationTO> {
    return this.http.post<BookRecommendationTO>(this.api, bookRecommendation);
  }
  update(bookRecommendation: BookRecommendationTO): Observable<BookRecommendationTO> {
      return this.http.put<BookRecommendationTO>(this.api + bookRecommendation.id, bookRecommendation);
  }
  delete(bookRecommendationid: string): Observable<void> {
      return this.http.delete<void>(this.api + bookRecommendationid);
  }

  getRecommentionsSent(profileSubmitter: number): Observable<BookRecommendationTO[]> {
    return this.http.get<BookRecommendationTO[]>(this.api + 'sent/' + profileSubmitter);
  }

  getRecommentionById(recommendationId: string): Observable<BookRecommendationTO[]> {
    return this.http.get<BookRecommendationTO[]>(this.api + recommendationId);
  }

  getRecommentionsReceived(profileReceived: number): Observable<BookRecommendationTO[]> {
    return this.http.get<BookRecommendationTO[]>(this.api + 'received/' + profileReceived);
  }
}
