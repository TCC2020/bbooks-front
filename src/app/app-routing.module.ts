<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { AuthConfirmComponent } from './views/auth-confirm/auth-confirm.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { CadastroSegundaEtapaComponent } from './views/cadastro-segunda-etapa/cadastro-segunda-etapa.component';
import { BookPageComponent } from './views/book-page/book-page.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'book', component: BookPageComponent
  },
  {
    path: 'confirm', component: AuthConfirmComponent
  },
  { 
    path: 'cadastro', component: CadastroComponent
  },
  { 
    path: 'cadastro/detalhes', component: CadastroSegundaEtapaComponent
  }
=======
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './views/main-page/main-page.component';


const routes: Routes = [
    {
        path: '', component: MainPageComponent,
    },
    {
        path: 'book',
        loadChildren: () => import('./views/book-page/book.module').then(m => m.BookModule)
    }
>>>>>>> 5ba1e4bab938829a95e995a7034974a8f9741b2f
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
