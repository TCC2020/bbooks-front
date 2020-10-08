import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { AuthConfirmComponent } from './views/auth-confirm/auth-confirm.component';
import { CadastroSegundaEtapaComponent } from './views/cadastro-segunda-etapa/cadastro-segunda-etapa.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
import { NovaSenhaComponent } from './views/nova-senha/nova-senha.component';
import { LoginComponent } from './modals/login/login.component';
import {AuthGuard} from './guards/auth-guard';
import {AuthVerifyLogin} from './guards/auth-verify-login';
import { PerfilComponent } from './views/perfil-page/perfil/perfil.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';


const routes: Routes = [
    {
        path: '', component: MainPageComponent,
    },
    {
        path: 'login', component: LoginComponent,
        canActivate: [AuthVerifyLogin]
    },
    {
        path: 'cadastro', component: CadastroComponent,
        canActivate: [AuthVerifyLogin]
    },
    {
        path: 'confirm', component: AuthConfirmComponent
    },
    {
        path: 'continuar-cadastro', component: CadastroSegundaEtapaComponent,
    },
    {
        path: 'recuperar-senha', component: RecuperarSenhaComponent,
    },
    {
        path: 'nova-senha/:token', component: NovaSenhaComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/book-page/book.module').then(m => m.BookModule)
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/perfil-page/perfil-page.module').then(m => m.PerfilPageModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
