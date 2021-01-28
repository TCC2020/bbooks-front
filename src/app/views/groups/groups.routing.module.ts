import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutGroupComponent } from './about-group/about-group.component';
import { FeedGroupComponent } from './feed-group/feed-group.component';
import { MembersGroupComponent } from './members-group/members-group.component';
import { ReadingGroupComponent } from './reading-group/reading-group.component';
import {BookMonthComponent} from './book-month/book-month.component';

const groupsRouter = [
    {
        path: '', component: ReadingGroupComponent,
        children: [
            {
                path: 'feed', component: FeedGroupComponent
            },
            {
                path: 'about', component: AboutGroupComponent
            },
            {
                path: 'members', component: MembersGroupComponent
            },
            {
                path: 'book-of-month', component: BookMonthComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(groupsRouter)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }
