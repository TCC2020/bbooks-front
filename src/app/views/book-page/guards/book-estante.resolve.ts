import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BookService} from '../../../services/book.service';
import {Book} from '../../../models/book.model';
import {Observable} from 'rxjs';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookCase} from '../../../models/bookCase.model';
import {of} from 'rxjs';
import {TagService} from '../../../services/tag.service';
import {map} from 'rxjs/operators';

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
        const tag = route.params.tag;
        const bookCase = new BookCase();
        bookCase.books = [];
        bookCase.description = tag;
        bookCase.id = tag;
        if (myBook) {
            if (tag) {
                return this.bookService.getBookCaseByTag(tag);
            } else {
                this.bookService.getAllBooks().subscribe(books => {
                    bookCase.books = books;
                },
                error => console.log('errro', error));
            }
        } else {
            this.gBooksService.searchByName(tag).subscribe(books => {
                bookCase.books = this.bookService.convertBookToBookList(books.items).map(book => {
                    this.bookService.getAllUserBooks().subscribe((userbooks) => {
                        userbooks.books.forEach(userbook => {
                            if (userbook.idBookGoogle === book.id) {
                                book.status = userbook.status;
                                book.idUserBook = userbook.id;
                                book.finishDate = userbook.finishDate;
                            }
                        });
                    });
                    return book;
                });

            });
        }
        return of(bookCase);
    }
}
