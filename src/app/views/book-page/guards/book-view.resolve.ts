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
        const id = route.params['id'];
        return this.gBookService.getById(id).pipe(map(b => {
            const book = this.bookService.convertBookToModel(b);
            this.userbooks.books.forEach(userbook => {
                if (userbook.idBook === book.id) {
                    book.status = userbook.status;
                    book.idUserBook = userbook.id;
                }
            });
            return book;
        }));
    }
}
