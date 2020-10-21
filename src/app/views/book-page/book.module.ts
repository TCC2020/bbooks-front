import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BookRoutingModule} from './book.routing.module';
import {BookMenuComponent} from './book-menu/book-menu.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookPageComponent} from './book-page.component';
import {BookComponent} from '../../modals/book/book.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CarrouselComponent} from './carrousel/carrousel.component';
import {BookViewComponent} from './book-view/book-view.component';
import {RatingComponent} from '../../components/rating/rating.component';
import {BookEstanteResolve} from './guards/book-estante.resolve';
import {BookViewResolve} from './guards/book-view.resolve';
import {CarrouselResolve} from './guards/carrousel.resolve';
import {BooksComponent} from './books/books.component';
import {BooksResolve} from './guards/books.resolve';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from '../shared/shared.module';
import {TagDialogComponent} from './tag-dialog/tag-dialog.component';
import {TrackingDialogComponent} from './tracking-dialog/tracking-dialog.component';
import {TrackingViewComponent} from './tracking-view/tracking-view.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BookRoutingModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        MatInputModule,
        CarouselModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        })
    ],
    declarations: [
        BookComponent,
        BookPageComponent,
        BookFormComponent,
        BookMenuComponent,
        BookEstanteComponent,
        CarrouselComponent,
        BookViewComponent,
        RatingComponent,
        BooksComponent,
        TagDialogComponent,
        TrackingDialogComponent,
        TrackingViewComponent

    ],
    entryComponents: [
        // BookcaseModalComponent
    ],
    providers: [
        BookEstanteResolve,
        CarrouselResolve,
        BookViewResolve,
        BooksResolve
    ],
    bootstrap: [BookPageComponent],
})
export class BookModule {
}
