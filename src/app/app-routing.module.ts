import { PreviousGoalsComponent } from './views/previous-goals/previous-goals.component';
import { ReadingTargetProgressComponent } from './views/reading-target-progress/reading-target-progress.component';
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
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {LiteraryCompetitionComponent} from './views/literary-competition-page/literary-competition/literary-competition.component';
// tslint:disable-next-line:max-line-length
import {MembersLiteraryCompetitionComponent} from './views/literary-competition-page/members-literary-competition/members-literary-competition.component';
// tslint:disable-next-line:max-line-length
import {AdministratorsLiteraryCompetitionComponent} from './views/literary-competition-page/administrators-literary-competition/administrators-literary-competition.component';
// tslint:disable-next-line:max-line-length
import {StoryLiteraryCompetitionComponent} from './views/literary-competition-page/story-literary-competition/story-literary-competition.component';
// tslint:disable-next-line:max-line-length
import {CreateLiteraryCompetitionComponent} from './views/literary-competition-page/create-literary-competition/create-literary-competition.component';
// tslint:disable-next-line:max-line-length
import {ListLiteraryCompetitionComponent} from './views/literary-competition-page/list-literary-competition/list-literary-competition.component';
import {ChatComponent} from './views/chat/chat.component';

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
        path: 'andamento-meta-leitura', component: ReadingTargetProgressComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'metas-anteriores', component: PreviousGoalsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pagenotfound',
        component: PageNotFoundComponent
    },
    {
        path: '',
        loadChildren: () => import('./views/exchange/exchange.module').then(m => m.ExchangeModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'feed' ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/feed-page/feed-page.module').then(m => m.FeedPageModule)
    },
    {
        path: '' ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/groups/groups.module').then(m => m.GroupsModule)
    },
    {
        path: 'literary-competition' ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/literary-competition-page/literary-competition.module').then(m => m.LiteraryCompetitionModule)
    },
    {
        path: '' ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/public-profile-page/public-profile-page.module').then(m => m.PublicProfilePageModule)
    },
    {
        path: '' ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/search/search.module').then(m => m.SearchModule)
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
