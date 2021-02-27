import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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


@NgModule({
    declarations: [
        AdministratorsLiteraryCompetitionComponent,
        CreateLiteraryCompetitionComponent,
        ListLiteraryCompetitionComponent,
        LiteraryCompetitionComponent,
        MembersLiteraryCompetitionComponent,
        StoryLiteraryCompetitionComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        LiteraryCompetitionRoutingModule
    ]
})
export class LiteraryCompetitionModule {
}
