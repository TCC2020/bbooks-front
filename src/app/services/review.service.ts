import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Friend} from '../models/friend.model';
import {Observable} from 'rxjs';
import {ReviewTO} from '../models/ReviewTO.model';
import {ReviewsPagination} from '../models/pagination/reviews.pagination';
import {map} from 'rxjs/operators';
import {ProfileService} from './profile.service';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    api: string = environment.api + 'review/';
    constructor(
        private http: HttpClient,
        private profileService: ProfileService
    ) {
    }

    save(review: ReviewTO): Observable<ReviewTO> {
        return this.http.post<ReviewTO>(this.api, review);
    }
    delete(reviewId: string): Observable<void> {
        return this.http.delete<void>(this.api + reviewId);
    }
    update(review: ReviewTO): Observable<ReviewTO> {
        return this.http.put<ReviewTO>(this.api + review.id, review);
    }
    getAllByBook(idBook: number, size: number, page: number): Observable<ReviewsPagination> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<ReviewsPagination>(this.api + 'book/' + idBook , {params})
            .pipe(
                map(reviewsPagination => {
                    reviewsPagination.content = this.mapForReviews(reviewsPagination.content);
                    return reviewsPagination;
                })
            );
    }
    getAllByGoogleBook(googleBook: string, size: number, page: number): Observable<ReviewsPagination> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<ReviewsPagination>(this.api + 'google-book/' + googleBook, {params})
            .pipe(
                map(reviewsPagination => {
                    reviewsPagination.content = this.mapForReviews(reviewsPagination.content);
                    return reviewsPagination;
                })
            );
    }
    mapForReviews(reviews: ReviewTO[]): ReviewTO[] {
        return reviews.map(r => {
            r.profileTO = this.profileService.getById(r.profileId);
            return r;
        });
    }
}

