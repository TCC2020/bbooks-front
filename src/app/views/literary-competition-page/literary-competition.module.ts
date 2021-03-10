import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// tslint:disable-next-line:max-line-length
import {AdministratorsLiteraryCompetitionComponent} from './administrators-literary-competition/administrators-literary-competition.component';
import {CreateLiteraryCompetitionComponent} from './create-literary-competition/create-literary-competition.component';
import {ListLiteraryCompetitionComponent} from './list-literary-competition/list-literary-competition.component';
import {LiteraryCompetitionComponent} from './literary-competition/literary-competition.component';
import {MembersLiteraryCompetitionComponent} from './members-literary-competition/members-literary-competition.component';
import {StoryLiteraryCompetitionComponent} from './story-literary-competition/story-literary-competition.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {LiteraryCompetitionRoutingModule} from './literary-competition.routing.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CreateStoryComponent} from './create-story/create-story.component';
import {RegistrationsComponent} from './registrations/registrations.component';
import {AddAdministratorComponent} from './add-administrator/add-administrator.component';
import {VoteComponent} from './vote/vote.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        AdministratorsLiteraryCompetitionComponent,
        CreateLiteraryCompetitionComponent,
        ListLiteraryCompetitionComponent,
        LiteraryCompetitionComponent,
        MembersLiteraryCompetitionComponent,
        StoryLiteraryCompetitionComponent,
        CreateStoryComponent,
        RegistrationsComponent,
        AddAdministratorComponent,
        VoteComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LiteraryCompetitionRoutingModule,
        InfiniteScrollModule,
        SharedModule
    ]
})
export class LiteraryCompetitionModule {
}
