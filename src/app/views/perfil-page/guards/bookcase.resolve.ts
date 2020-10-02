import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';
import {map, take} from 'rxjs/operators';
import {BookCase} from '../../../models/bookCase.model';
import {BookService} from '../../../services/book.service';


@Injectable()
export class BookcaseResolve implements Resolve<BookCase> {
    bookCase: BookCase = new BookCase();

    constructor(
        private bookService: BookService,
    ) {
        this.bookCase.books = [];
        this.bookService.getAllBooks().subscribe(books => {
            this.bookCase.books = books;
        });
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.bookCase;
    }
}
