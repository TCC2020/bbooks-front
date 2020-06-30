import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BookPageComponent} from './book-page.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';


const bookRoutes: Routes = [
    {
        path: '', component: BookPageComponent, children: [
            {path: 'list', component: BookEstanteComponent},
            {path: ':id', component: BookFormComponent},
            {path: ':id/edit', component: BookFormComponent},
            {path: 'bookcase', component: BookEstanteComponent}
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(bookRoutes)],
    exports: [RouterModule]
})
export class BookRoutingModule {
}
