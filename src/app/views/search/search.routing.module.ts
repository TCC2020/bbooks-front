import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainSearchComponent} from './main-search/main-search.component';
import {GroupsSearchComponent} from './groups-search/groups-search.component';
import {PesquisarAmigosComponent} from './pesquisar-amigos/pesquisar-amigos.component';

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
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(searchRouter)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
