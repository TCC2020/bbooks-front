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
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ReactionsComponent} from './reactions/reactions.component';
import {PostCreateComponent} from './post-create/post-create.component';
import {TextareaAutoresizeDirective} from './directive/textarea-autoresize.directive';
import {SearchBookComponent} from './search-book/search-book.component';
import {BarCodeScannerComponent} from './bar-code-scanner/bar-code-scanner.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ViewAllReactionsComponent} from './view-all-reactions/view-all-reactions.component';
import {EmptyContentMessageComponent} from './empty-content-message/empty-content-message.component';


@NgModule({
    declarations: [
        BookCardComponent,
        BookAddDialogComponent,
        NumbersOnlyInputDirective,
        LoaderComponent,
        ReferBookDialogComponent,
        PostDialogComponent,
        ReactionsComponent,
        PostCreateComponent,
        TextareaAutoresizeDirective,
        SearchBookComponent,
        BarCodeScannerComponent,
        ViewAllReactionsComponent,
        EmptyContentMessageComponent
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
        SweetAlert2Module,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        ZXingScannerModule
    ],
    exports: [
        BookCardComponent,
        NumbersOnlyInputDirective,
        LoaderComponent,
        BookAddDialogComponent,
        ReferBookDialogComponent,
        PostDialogComponent,
        ReactionsComponent,
        PostCreateComponent,
        TextareaAutoresizeDirective,
        SearchBookComponent,
        BarCodeScannerComponent,
        ViewAllReactionsComponent,
        EmptyContentMessageComponent
    ],
    providers: []
})
export class SharedModule {
}
