import { GoogleBooksService } from './../../services/google-books.service';
import { BookService } from './../../services/book.service';
import { UserBookTO } from './../../models/userBookTO';
import { ReadingTargetTO } from './../../models/readingTargetTO.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ReadingTargetService } from 'src/app/services/reading-target.service';
import { Book } from 'src/app/models/book.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-previous-goals',
  templateUrl: './previous-goals.component.html',
  styleUrls: ['./previous-goals.component.scss']
})
export class PreviousGoalsComponent implements OnInit {

  panelOpenState = false;
  searchPreviousGoals: any;
  previousGoals: ReadingTargetTO[];

  constructor(
    private readingTargetService: ReadingTargetService,
    private bookService: BookService,
    private gBooksService: GoogleBooksService,
    public authService: AuthService
  ) {
   }

  ngOnInit(): void {
    this.getPreviousGoals();
  }

  getPreviousGoals() {
    this.readingTargetService.getAllByProfileId(this.authService.getUser().profile.id)
    .subscribe(
      (res) => {
        this.previousGoals = res;
        this.previousGoals.shift();
        this.previousGoals.forEach(r => {
          this.getBookToUserBook(r.targets);
        });
      },
      error => {
          console.log('PreviousGoals Error', error);
      }
    );
  }

  getBookToUserBook(userBooks: UserBookTO[]) {
    userBooks.forEach((realation, i) => {
      if (realation.idBookGoogle) {
        return this.gBooksService.getById(realation.idBookGoogle).pipe(
            map(book => {
                const b = this.bookService.convertBookToModel(book);
                b.idUserBook = realation.id;
                b.status = realation.status;
                b.finishDate = realation.finishDate;
                return b;
            })
        ).subscribe(
          (resBook) => {
            userBooks[i].book = resBook;
          }
        );
    } else {
        const id = realation.idBook ? realation.idBook : realation.book.id;
        return this.bookService.getById(id as number).pipe(
            map(b => {
                b.idUserBook = realation.id;
                b.status = realation.status;
                b.finishDate = realation.finishDate;
                return b;
            })
        ).subscribe(
          (resBook) => {
            userBooks[i].book = resBook;
          }
        );
    }
    });
  }
}
