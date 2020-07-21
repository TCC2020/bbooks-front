import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookPageComponent} from './book-page.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookLibraryComponent} from "./book-library/book-library.component";
import {BookViewComponent} from "./book-view/book-view.component";


const bookRoutes: Routes = [
    {
        path: '', component: BookPageComponent, children: [
            {path: '', component: BookLibraryComponent},
            {path: 'my', component: BookLibraryComponent},
            {path: 'my/:bookcase', component: BookEstanteComponent},
            {path: 'view/:id', component: BookViewComponent},
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
