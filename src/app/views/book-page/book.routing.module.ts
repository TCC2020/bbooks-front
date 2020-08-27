import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookPageComponent} from './book-page.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookViewComponent} from "./book-view/book-view.component";
import {BookEstanteResolve} from "./guards/book-estante.resolve";
import {BookViewResolve} from "./guards/book-view.resolve";
import {BooksComponent} from "./books/books.component";
import {BooksResolve} from "./guards/books.resolve";


const bookRoutes: Routes = [
    {
        path: '', component: BookPageComponent, children: [
            {
                path: 'book', component: BooksComponent,
                resolve: {bookcases: BooksResolve }
            },
            {
                path: 'book/:tag/:id', component: BookViewComponent,
                resolve: {book: BookViewResolve}
            },
            {path: 'new', component: BookFormComponent},
            {path: 'books/:id/edit', component: BookFormComponent},
            {
                path: 'book/:tag', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve}
            },
            // mybooks router
            {
                path: 'mybooks', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve }
            },
            {
                path: 'mybooks/:tag', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve}
            },
            {
                path: 'mybooks/:tag/:id', component: BookViewComponent,
                resolve: {book: BookViewResolve}
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(bookRoutes)],
    exports: [RouterModule]
})
export class BookRoutingModule {
}
