import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookPageComponent} from './book-page.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookLibraryComponent} from "./book-library/book-library.component";
import {BookViewComponent} from "./book-view/book-view.component";
import {BookEstanteResolve} from "./guards/book-estante.resolve";
import {BookViewResolve} from "./guards/book-view.resolve";
import {BooksComponent} from "./books/books.component";


const bookRoutes: Routes = [
    {
        path: '', component: BookPageComponent, children: [
            {
                path: 'books', component: BooksComponent
            },
            {
                path: 'books/:id', component: BookViewComponent,
                resolve: {book: BookViewResolve}
            },
            {path: 'new', component: BookFormComponent},
            {path: 'books/:id/edit', component: BookFormComponent},
            {path: 'mybooks', component: BookLibraryComponent},
            {
                path: 'mybooks/bookcase/:bookcase', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve}
            },
            {
                path: 'bookcase/:bookcase', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve}
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(bookRoutes)],
    exports: [RouterModule]
})
export class BookRoutingModule {
}
