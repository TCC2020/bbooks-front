import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(private http: HttpClient) { }

  searchByName(bookName) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + bookName);
  }

  getById(id: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + id);
  }
}
