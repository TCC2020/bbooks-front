import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AboutPublicProfileComponent} from './about-public-profile/about-public-profile.component';
import {FeedPublicProfileComponent} from './feed-public-profile/feed-public-profile.component';
import {CreatePublicProfileComponent} from './create-public-profile/create-public-profile.component';
import {PostDialogComponent} from '../shared/post-dialog/post-dialog.component';
import {AuthGuard} from '../../guards/auth-guard';

const publicProfileRouters = [
    {
        path: 'perfil-publico/:id',
        component: PublicProfileComponent,
        children: [
            {
                path: 'feed', component: FeedPublicProfileComponent
            },
            {
                path: 'about', component: AboutPublicProfileComponent
            },
            { path: '', redirectTo: 'feed', pathMatch: 'full' },
        ]
    },
    {
        path: 'public-profile/create-post', component: PostDialogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'public-profile/criar',
        component: CreatePublicProfileComponent
    },
    {
        path: 'perfil-publico/:id/edit',
        component: CreatePublicProfileComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(publicProfileRouters)],
    exports: [RouterModule]
})
export class PublicProfilePageRoutingModule {
}
