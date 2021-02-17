import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {FeedPageRoutingModule} from './feed-page.routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../book-page/book.module';
import {HttpClient} from '@angular/common/http';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducer} from '../perfil-page/store/reducers/feed.reducer';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        FeedPageRoutingModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        SharedModule,
        InfiniteScrollModule,
        StoreModule.forFeature('feed', reducer),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
    ]
})
export class FeedPageModule {
}
