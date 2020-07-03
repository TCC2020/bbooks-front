import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './views/main-page/main-page.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { NovaSenhaComponent } from './views/nova-senha/nova-senha.component';


const routes: Routes = [
    {
        path: '', component: MainPageComponent,
    },
    {
      path: 'cadastro', component: CadastroComponent,
    },
    {
        path: 'nova-senha', component: NovaSenhaComponent,
    },
    {
        path: 'book',
        loadChildren: () => import('./views/book-page/book.module').then(m => m.BookModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
