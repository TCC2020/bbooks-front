import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';
import {map, take} from 'rxjs/operators';
import {BookCase} from '../../../models/bookCase.model';
import {BookService} from '../../../services/book.service';
import {UserbookService} from '../../../services/userbook.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {Profile} from '../../../models/profileTO.model';
import {AuthService} from '../../../services/auth.service';


@Injectable()
export class BookcaseResolve implements Resolve<any> {
    bookCase: BookCase = new BookCase();
    user = new UserTO();


    constructor(
        private bookService: BookService,
        private userService: UserService,
        private userBookService: UserbookService,
        private gBooksService: GoogleBooksService,
        private authservice: AuthService
    ) {
        this.bookCase.books = [];
        this.user.profile = new Profile();

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const username = route.parent.params.username;
        this.bookCase.books = [];
        this.userService.getUserName(username, this.authservice.getToken()).pipe(take(1)).subscribe(user => {
            // tslint:disable-next-line:radix
            this.userBookService.getAllByProfile(Number.parseInt(user.profile.id))
                .pipe(take(1))
                .subscribe(userBook => {
                userBook.books.forEach(realation => {
                    if (realation.idBookGoogle) {
                        this.gBooksService.getById(realation.idBookGoogle).subscribe(book => {
                            const b = this.bookService.convertBookToModel(book);
                            b.idUserBook = realation.id;
                            b.status = realation.status;
                            this.bookCase.books.push(b);

                        });
                    } else {
                        const id = realation.idBook ? realation.idBook :  realation['book'].id;
                        this.bookService.getById(id).subscribe(book => {
                            const b = this.bookService.convertBookToModel(book);
                            b.idUserBook = realation.id;
                            b.status = realation.status;
                            this.bookCase.books.push(b);
                        });
                    }
                });
            });
            this.user.id = user.id;
            this.user.idSocial = user.idSocial;
            this.user.email = user.email;
            this.user.verified = user.verified;
            this.user.userName = user.userName;
            this.user.token = user.token;
            this.user.profile.id = this.user.profile.id;
            this.user.profile.name = this.user.profile.name;
        });
        return {
            bookcase: this.bookCase,
            user: this.user
        };
    }
}
