import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AboutPublicProfileComponent} from './about-public-profile/about-public-profile.component';
import {FeedPublicProfileComponent} from './feed-public-profile/feed-public-profile.component';

const publicProfileRouters = [
    {
        path: 'perfil-publico',
        component: PublicProfileComponent,
        children: [
            {
                path: 'about', component: AboutPublicProfileComponent
            },
            {
                path: 'feed', component: FeedPublicProfileComponent
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(publicProfileRouters)],
    exports: [RouterModule]
})
export class PublicProfilePageRoutingModule { }
