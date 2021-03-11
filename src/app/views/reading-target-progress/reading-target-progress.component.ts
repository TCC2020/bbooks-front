import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReadingTargetTO } from 'src/app/models/readingTargetTO.model';
import { UserBookTO } from 'src/app/models/userBookTO';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { ReadingTargetService } from 'src/app/services/reading-target.service';

@Component({
  selector: 'app-reading-target-progress',
  templateUrl: './reading-target-progress.component.html',
  styleUrls: ['./reading-target-progress.component.scss']
})
export class ReadingTargetProgressComponent implements OnInit {

  panelOpenState = false;
  searchPreviousGoals: any;
  previousGoals: ReadingTargetTO[];
  currentDate = new Date().getFullYear();
  currentReadingTarget: ReadingTargetTO;

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
        this.currentReadingTarget = this.previousGoals[0];
        if (this.currentReadingTarget?.targets?.length > 0) {
            this.getBookToUserBook(this.currentReadingTarget?.targets);
        }
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
