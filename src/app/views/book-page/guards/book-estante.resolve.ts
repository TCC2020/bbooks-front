import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {Book} from "../../../models/book.model";
import {Observable} from "rxjs";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookCase} from "../../../models/bookCase.model";
import {of} from "rxjs";

@Injectable()
export class BookEstanteResolve implements Resolve<Book[]> {

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
        bookCase.books = [];
        bookCase.description = bookcaseDescripton;
        if (myBook) {
            bookCase = this.bookService.getBookCaseByDescription(bookcaseDescripton);
            if (bookCase) {
                return bookCase;
            }
        } else {
            this.gBooksService.searchByName(bookcaseDescripton).subscribe(books => {
                bookCase.books = this.bookService.convertBookToBookList(books['items']);
            });
            return of(bookCase);
        }
    }
}
