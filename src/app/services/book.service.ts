import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookcases: string[] = ['Romance', 'Ficção'];

  constructor() { }

  getBookCase() {
    return this.bookcases;
  }
  addBookCases(bookcase: string) {
    this.bookcases.push(bookcase);
  }
}
