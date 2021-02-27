import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainExchangeComponent} from '../exchange/main-exchange/main-exchange.component';
import {MyOffersComponent} from '../exchange/my-offers/my-offers.component';
import {LiteraryCompetitionComponent} from './literary-competition/literary-competition.component';
import {AdministratorsLiteraryCompetitionComponent} from './administrators-literary-competition/administrators-literary-competition.component';
import {CreateLiteraryCompetitionComponent} from './create-literary-competition/create-literary-competition.component';
import {ListLiteraryCompetitionComponent} from './list-literary-competition/list-literary-competition.component';
import {MembersLiteraryCompetitionComponent} from './members-literary-competition/members-literary-competition.component';
import {StoryLiteraryCompetitionComponent} from './story-literary-competition/story-literary-competition.component';

const literaryCompetitionRouter = [
    {
        path: '',
        component: ListLiteraryCompetitionComponent,
    },
    {
        path: ':id/administrators',
        component: AdministratorsLiteraryCompetitionComponent
    },
    {
        path: 'create',
        component: CreateLiteraryCompetitionComponent
    },
    {
        path: ':id',
        component: LiteraryCompetitionComponent
    },
    {
        path: ':id/members',
        component: MembersLiteraryCompetitionComponent
    },
    {
        path: ':id/story',
        component: StoryLiteraryCompetitionComponent
    },
    {
        path: ':id/edit',
        component: CreateLiteraryCompetitionComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(literaryCompetitionRouter)],
    exports: [RouterModule]
})
export class LiteraryCompetitionRoutingModule {
}