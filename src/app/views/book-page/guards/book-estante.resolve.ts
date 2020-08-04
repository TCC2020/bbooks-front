import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {Book} from "../../../models/book.model";
import {Observable} from "rxjs";
import {GoogleBooksService} from "../../../services/google-books.service";
import {BookCase} from "../../../models/bookCase.model";
import {of} from "rxjs";
import {TagService} from "../../../services/tag.service";

@Injectable()
export class BookEstanteResolve implements Resolve<Book[]> {

    constructor(
        private bookService: BookService,
        private gBooksService: GoogleBooksService,
        private tagService: TagService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const myBook = route.url.toString().includes('my');
        const tag = route.params['tag'];
        let bookCase = new BookCase();
        bookCase.books = [];
        bookCase.description = tag;
        bookCase.id = tag;
        if (myBook) {
            this.bookService.getBookCaseByTag(tag).subscribe(bookcase => {
                bookCase = bookcase;
            });
        } else {
            console.log(route.url.toString());
            this.gBooksService.searchByName(tag).subscribe(books => {
                bookCase.books = this.bookService.convertBookToBookList(books['items']);
            });
        }
        return of(bookCase);
    }
}
