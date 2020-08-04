import {GoogleBooksService} from "../../../services/google-books.service";
import {BookCase} from "../../../models/bookCase.model";
import {Observable, of} from "rxjs";
import {TagService} from "../../../services/tag.service";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class BooksResolve implements Resolve<BookCase[]> {


    constructor(
        private bookService: BookService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const myBook = route.url.toString().includes('mybooks');
        let bookcases = [];
        if (myBook) {
            this.bookService.getAllBooksTags()
                .subscribe(bcs => {
                    bookcases = bcs ;
                });
        } else {
            this.bookService.getAllBookGoogle()
                .subscribe(bcs => {
                    bookcases = bcs ;
                });
        }
        return of(bookcases);

    }
}
