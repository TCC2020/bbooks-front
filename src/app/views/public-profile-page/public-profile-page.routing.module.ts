import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AboutPublicProfileComponent} from './about-public-profile/about-public-profile.component';
import {FeedPublicProfileComponent} from './feed-public-profile/feed-public-profile.component';
import {CreatePublicProfileComponent} from './create-public-profile/create-public-profile.component';

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
            }
        ]
    },
    {
        path: 'perfil-publico/criar-perfil-publico',
        component: CreatePublicProfileComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(publicProfileRouters)],
    exports: [RouterModule]
})
export class PublicProfilePageRoutingModule {
}
