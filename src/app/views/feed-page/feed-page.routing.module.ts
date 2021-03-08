import {RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';
import {PostDialogComponent} from '../shared/post-dialog/post-dialog.component';
import {AuthGuard} from '../../guards/auth-guard';

const feedRouter = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'create-post', component: PostDialogComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(feedRouter)],
    exports: [RouterModule]
})
export class FeedPageRoutingModule { }
