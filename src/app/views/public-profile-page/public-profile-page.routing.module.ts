import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainGuard} from '../perfil-page/guards/main.guard';
import {MainResolve} from '../perfil-page/guards/main.resolve';

import {MainComponent} from './main/main.component';

const publicProfile = [
    {
        path: ':username/public-profile', component: MainComponent,
        canActivate: [MainGuard],
        resolve: {user: MainResolve}
    }
];


@NgModule({
    imports: [RouterModule.forChild(publicProfile)],
    exports: [RouterModule]
})
export class PublicProfilePageRoutingModule { }
