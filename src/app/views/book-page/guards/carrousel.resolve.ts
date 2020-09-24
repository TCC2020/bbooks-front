import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book.model';
import {Observable} from 'rxjs';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookCase} from '../../../models/bookCase.model';

@Injectable()
export class CarrouselResolve implements Resolve<Book[]> {

    constructor(
        private bookService: BookService,
        private gBooksService: GoogleBooksService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const myBook = route.url.toString().includes('my');
        const bookcaseDescripton = route.params['bookcase'];
        let bookCase = new BookCase();
        if (myBook) {
            // bookCase = this.bookService.getBookCaseByDescription(bookcaseDescripton);
            if (bookCase) {
                return bookCase;
            }
        } else {
            this.gBooksService.searchByName(bookcaseDescripton).subscribe(books => {
                return  this.bookService.convertBookToBookList(books['items']);
            });
        }
    }
}
