import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(private http: HttpClient) { }

  searchByName(bookName): any {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + bookName);
  }
  searchByNamePagination(bookName: string, maxResult: number, index: number): any {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?maxResults=' + maxResult + '&q=' + bookName + '&startIndex=' + index);
  }

  getById(id: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + id);
  }
}
