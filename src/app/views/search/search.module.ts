import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchRoutingModule} from './search.routing.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../book-page/book.module';
import {HttpClient} from '@angular/common/http';
import {MainSearchComponent} from './main-search/main-search.component';
import {GroupsSearchComponent} from './groups-search/groups-search.component';
import {PesquisarAmigosComponent} from './pesquisar-amigos/pesquisar-amigos.component';
import {BooksSearchComponent} from './books-search/books-search.component';
import {SharedModule} from '../shared/shared.module';
import {CompetitionSearchComponent} from './competition-search/competition-search.component';


@NgModule({
    declarations: [
        MainSearchComponent,
        GroupsSearchComponent,
        PesquisarAmigosComponent,
        BooksSearchComponent,
        CompetitionSearchComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
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
        SharedModule,
    ]
})
export class SearchModule {
}
