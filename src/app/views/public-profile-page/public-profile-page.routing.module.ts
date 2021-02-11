import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const publicProfileRouters = [
    {
        path: 'perfil-publico',
        component: PublicProfileComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(publicProfileRouters)],
    exports: [RouterModule]
})
export class PublicProfilePageRoutingModule { }