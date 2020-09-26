import {BookCase} from '../../../models/bookCase.model';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BookService} from '../../../services/book.service';

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
            this.bookService.getAllBooksTags().subscribe(
                bcs => {
                    bookcases = bcs;
                }, error => console.log('error booksResolve', error));
        } else {
            this.bookService.getAllBookGoogle()
                .subscribe(bcs => {
                    bookcases = bcs;
                }, error => console.log('error booksResolve', error));
        }
        return of(bookcases);

    }
}
