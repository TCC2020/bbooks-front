import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {PerfilPageRoutingModule} from './perfil-page.routing.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FriendComponent} from './friend/friend.component';
import {FeedComponent} from './feed/feed.component';
import {BookcaseComponent} from './bookcase/bookcase.component';
import {UserService} from '../../services/user.service';
import {MainResolve} from './guards/main.resolve';
import {FeedResolve} from './guards/feed.resolve';
import {BookcaseResolve} from './guards/bookcase.resolve';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {BookModule, HttpLoaderFactory} from '../book-page/book.module';
import {SharedModule} from '../shared/shared.module';
import {PerfilComponent} from './perfil/perfil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRouteSnapshot} from '@angular/router';
import {FriendResolve} from './guards/friend.resolve';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        MainPageComponent,
        FriendComponent,
        FeedComponent,
        BookcaseComponent,
        PerfilComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PerfilPageRoutingModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        BookModule
    ],
    providers: [
        UserService,
        MainResolve,
        FeedResolve,
        BookcaseResolve,
        FriendResolve
    ]
})
export class PerfilPageModule {
}
