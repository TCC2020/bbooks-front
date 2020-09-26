import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {FriendComponent} from './friend/friend.component';
import {FeedComponent} from './feed/feed.component';
import {BookcaseComponent} from './bookcase/bookcase.component';
import {MainResolve} from './guards/main.resolve';
import {MainGuard} from './guards/main.guard';


const perfilRouter = [
    {
        path: ':username', component: MainPageComponent,
        canActivate: [MainGuard],
        resolve: {user: MainResolve},
        children: [
            {
                path: 'friend', component: FriendComponent,
            },
            {
                path: 'feed', component: FeedComponent,
            },
            {
                path: 'bookcase', component: BookcaseComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(perfilRouter)],
    exports: [RouterModule]
})
export class PerfilPageRoutingModule {

}