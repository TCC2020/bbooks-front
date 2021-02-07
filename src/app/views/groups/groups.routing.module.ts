import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutGroupComponent } from './about-group/about-group.component';
import { FeedGroupComponent } from './feed-group/feed-group.component';
import { MembersGroupComponent } from './members-group/members-group.component';
import { ReadingGroupComponent } from './reading-group/reading-group.component';
import {MainGroupComponent} from './main-group/main-group.component';
import {YourGroupComponent} from './your-group/your-group.component';
import {CreateGroupComponent} from './create-group/create-group.component';

const groupsRouter = [
    {
        path: 'groups-search',
        component: MainGroupComponent,
        children: [
            {
                path: 'your-groups',
                component: YourGroupComponent
            },
            {
                path: 'create',
                component: CreateGroupComponent
            }
        ]
    },
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
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(groupsRouter)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }
