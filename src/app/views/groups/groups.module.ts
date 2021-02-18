import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsRoutingModule} from './groups.routing.module';
import {ReadingGroupComponent} from './reading-group/reading-group.component';
import {MaterialModule} from 'src/app/material/material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../book-page/book.module';
import {HttpClient} from '@angular/common/http';
import {FeedGroupComponent} from './feed-group/feed-group.component';
import {AboutGroupComponent} from './about-group/about-group.component';
import {MembersGroupComponent} from './members-group/members-group.component';
import {MainGroupComponent} from './main-group/main-group.component';
import {YourGroupComponent} from './your-group/your-group.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainGuardGroup} from './guards/main-group.guard';
import {MainGroupResolve} from './guards/main-group.resolve';
import {AboutGroupResolve} from './guards/about-group.resolve';
import {MembersGroupResolve} from './guards/members-group.resolve';
import { BookMonthComponent } from './book-month/book-month.component';
import {EventsGroupComponent} from './events-group/events-group.component';


@NgModule({
    declarations: [
        ReadingGroupComponent,
        FeedGroupComponent,
        AboutGroupComponent,
        MembersGroupComponent,
        BookMonthComponent,
        MainGroupComponent,
        YourGroupComponent,
        CreateGroupComponent,
        EventsGroupComponent
    ],
    imports: [
        CommonModule,
        GroupsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        FlexModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ],
    providers: [
        MainGuardGroup,
        MainGroupResolve,
        AboutGroupResolve,
        MembersGroupResolve
    ]
})
export class GroupsModule {
}
