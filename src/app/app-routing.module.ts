import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './views/main-page/main-page.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';


const routes: Routes = [
    {
        path: '', component: MainPageComponent,
    },
    {
      path: 'cadastro', component: CadastroComponent,
    },
    {
        path: 'recuperar-senha', component: RecuperarSenhaComponent,
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
