import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookPageComponent} from './book-page.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookLibraryComponent} from "./book-library/book-library.component";
import {BookViewComponent} from "./book-view/book-view.component";
import {BookEstanteResolve} from "./guards/book-estante.resolve";
import {BookViewResolve} from "./guards/book-view.resolve";


const bookRoutes: Routes = [
    {
        path: '', component: BookPageComponent, children: [
            {
                path: '', component: BookLibraryComponent,
                resolve: {bookcase: BookEstanteResolve}
            },
            {path: 'my', component: BookLibraryComponent},
            {
                path: 'my/:bookcase', component: BookEstanteComponent,
                resolve: {bookcase: BookEstanteResolve}
            },
            {
                path: 'view/:id', component: BookViewComponent,
                resolve: {book: BookViewResolve}
            },
            {path: 'new', component: BookFormComponent},
            {path: ':id/edit', component: BookFormComponent},
            {path: ':bookcase', component: BookEstanteComponent}
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(bookRoutes)],
    exports: [RouterModule]
})
export class BookRoutingModule {
}
