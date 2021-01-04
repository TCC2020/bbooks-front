import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../book-page/book.module';
import {BookCardComponent} from './book-card/book-card.component';
import {BookAddDialogComponent} from './book-add-dialog/book-add-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NumbersOnlyInputDirective} from './directive/numbers-only-input.directive';
import {LoaderComponent} from '../../loader/loader.component';
import { ReferBookDialogComponent } from './refer-book-dialog/refer-book-dialog.component';
import {PostDialogComponent} from './post-dialog/post-dialog.component';


@NgModule({
    declarations: [
        BookCardComponent,
        BookAddDialogComponent,
        NumbersOnlyInputDirective,
        LoaderComponent,
        ReferBookDialogComponent,
        PostDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        })
    ],
    exports: [
        BookCardComponent,
        NumbersOnlyInputDirective,
        LoaderComponent
    ],
    providers: []
})
export class SharedModule {
}
