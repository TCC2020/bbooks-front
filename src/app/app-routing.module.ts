import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { AuthConfirmComponent } from './views/auth-confirm/auth-confirm.component';
import { CadastroSegundaEtapaComponent } from './views/cadastro-segunda-etapa/cadastro-segunda-etapa.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
import { NovaSenhaComponent } from './views/nova-senha/nova-senha.component';
import { LoginComponent } from './modals/login/login.component';


const routes: Routes = [
    {
        path: '', component: MainPageComponent,
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'cadastrar', component: CadastroComponent,
    },
    {
        path: 'confirm', component: AuthConfirmComponent,
    },
    {
        path: 'continuar-cadastro', component: CadastroSegundaEtapaComponent,
    },
    {
        path: 'recuperar-senha', component: RecuperarSenhaComponent,
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
