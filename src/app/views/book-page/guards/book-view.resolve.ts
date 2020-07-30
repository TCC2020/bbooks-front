import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BookService} from "../../../services/book.service";
import {Book} from "../../../models/book.model";
import {Observable} from "rxjs";
import {GoogleBooksService} from "../../../services/google-books.service";

@Injectable()
export class BookViewResolve implements Resolve<Book> {

    constructor(
        private bookService: BookService,
        private gBookService: GoogleBooksService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const id = route.params['id'];
        return this.gBookService.getById(id);
    }
}
