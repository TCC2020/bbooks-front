import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainSearchComponent} from './main-search/main-search.component';
import {GroupsSearchComponent} from './groups-search/groups-search.component';
import {PesquisarAmigosComponent} from './pesquisar-amigos/pesquisar-amigos.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {BooksSearchComponent} from './books-search/books-search.component';
import {CompetitionSearchComponent} from './competition-search/competition-search.component';

const searchRouter = [
    {
        path: 'search',
        component: MainSearchComponent,
        children: [
            {
                path: 'people',
                component: PesquisarAmigosComponent
            },
            {
                path: 'groups',
                component: GroupsSearchComponent
            },
            {
                path: 'books',
                component: BooksSearchComponent
            },
            {
                path: 'competition',
                component: CompetitionSearchComponent
            },
            { path: '', redirectTo: 'people', pathMatch: 'full' },

        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(searchRouter)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
