import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {PerfilPageRoutingModule} from './perfil-page.routing.module';
import {MaterialModule} from '../../material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {FriendComponent} from './friend/friend.component';
import {FeedComponent} from './feed/feed.component';
import {BookcaseComponent} from './bookcase/bookcase.component';
import {UserService} from '../../services/user.service';
import {MainResolve} from './guards/main.resolve';


@NgModule({
    declarations: [
        MainPageComponent,
        FriendComponent,
        FeedComponent,
        BookcaseComponent
    ],
    imports: [
        CommonModule,
        PerfilPageRoutingModule,
        MaterialModule,
        FlexModule
    ],
    providers: [
        UserService,
        MainResolve
    ]
})
export class PerfilPageModule {
}
