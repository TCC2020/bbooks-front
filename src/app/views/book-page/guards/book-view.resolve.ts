import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book.model';
import {Observable} from 'rxjs';
import {GoogleBooksService} from '../../../services/google-books.service';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BookViewResolve implements Resolve<Book> {
    userbooks;
    constructor(
        private bookService: BookService,
        private gBookService: GoogleBooksService
    ) {
        this.bookService.getAllUserBooks().subscribe((userbooks) => {
            this.userbooks = userbooks;
        });
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        console.log('query', route.queryParams['api']);
        const api = route.queryParams['api'];
        const id = route.params['id'];

        if (api === 'google') {
            return this.gBookService.getById(id).pipe(map(b => {
                const book = this.bookService.convertBookToModel(b);
                this.userbooks.books.forEach(userbook => {
                    if (userbook.idBook === book.id) {
                        book.idUserBook = userbook.id;
                        book.status = userbook.status;
                    }
                });
                book.api = 'google';
                return book;
            }));
        } else {
            return this.bookService.getById(id)
                .pipe(
                    map(b => {
                        this.userbooks.books.forEach(userbook => {
                            if (userbook?.book?.id === b.id) {
                                b.idUserBook = userbook.id;
                                b.status = userbook.status;
                            }
                        });
                        b.api = 'bbooks';
                        return b;
                    })
                );
        }

    }
}
