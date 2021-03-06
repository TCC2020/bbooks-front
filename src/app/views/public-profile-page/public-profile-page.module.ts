import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';
import {FeedPublicProfileComponent} from './feed-public-profile/feed-public-profile.component';
import {AboutPublicProfileComponent} from './about-public-profile/about-public-profile.component';
import {PublicProfilePageRoutingModule} from './public-profile-page.routing.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {CreatePublicProfileComponent} from './create-public-profile/create-public-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../perfil-page/store/reducers/feed.reducer';
import {SharedModule} from '../shared/shared.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        PublicProfileComponent,
        FeedPublicProfileComponent,
        AboutPublicProfileComponent,
        CreatePublicProfileComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
        FlexModule,
        PublicProfilePageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        StoreModule.forFeature('PublicProfilePage', reducer),
        SharedModule,
        InfiniteScrollModule
    ]
})
export class PublicProfilePageModule {
}
