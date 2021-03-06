import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutGroupComponent } from './about-group/about-group.component';
import { FeedGroupComponent } from './feed-group/feed-group.component';
import { MembersGroupComponent } from './members-group/members-group.component';
import { ReadingGroupComponent } from './reading-group/reading-group.component';
import {BookMonthComponent} from './book-month/book-month.component';
import {MainGroupComponent} from './main-group/main-group.component';
import {YourGroupComponent} from './your-group/your-group.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {MainGroupResolve} from './guards/main-group.resolve';
import {MainGuardGroup} from './guards/main-group.guard';
import {AboutGroupResolve} from './guards/about-group.resolve';
import {MembersGroupResolve} from './guards/members-group.resolve';
import {PostDialogComponent} from '../shared/post-dialog/post-dialog.component';
import {AuthGuard} from '../../guards/auth-guard';
import {FeedGroupResolve} from './guards/feed-group.resolve';

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
            },
            { path: '', redirectTo: 'your-groups', pathMatch: 'full' },
        ]
    },
    {
        path: 'group/:id', component: ReadingGroupComponent,
        canActivate: [MainGuardGroup],
        resolve: {groupTo: MainGroupResolve},
        children: [
            {
                path: 'about', component: AboutGroupComponent,
                resolve: {groupTo: AboutGroupResolve},
            },
            {
                path: 'feed', component: FeedGroupComponent,
                resolve: {groupTo: FeedGroupResolve},
            },
            {
                path: 'members', component: MembersGroupComponent,
                resolve: {groupTo: MembersGroupResolve},
            },
            {
                path: 'book-of-month', component: BookMonthComponent
            },
            { path: '', redirectTo: 'feed', pathMatch: 'full' },

        ]
    },
    {
        path: 'groups/create-post', component: PostDialogComponent,
        canActivate: [AuthGuard]
    }
];


@NgModule({
    imports: [RouterModule.forChild(groupsRouter)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }
