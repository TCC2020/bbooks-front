import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import {BookRoutingModule} from './book.routing.module';
import {BookMenuComponent} from './book-menu/book-menu.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookPageComponent} from './book-page.component';
import {BookComponent} from '../../modals/book/book.component';
import {MaterialModule} from "../../material/material.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {CarouselModule} from "ngx-owl-carousel-o";
import {CarrouselComponent} from "./carrousel/carrousel.component";
import {BookAddDialogComponent} from "./book-add-dialog/book-add-dialog.component";
import {BookViewComponent} from "./book-view/book-view.component";
import {RatingComponent} from "../../components/rating/rating.component";
import {BookEstanteResolve} from "./guards/book-estante.resolve";
import {BookViewResolve} from "./guards/book-view.resolve";
import {CarrouselResolve} from "./guards/carrousel.resolve";
import {BooksComponent} from "./books/books.component";
import {TagDialogComponent} from "./tag-dialog/tag-dialog.component";
import {BooksResolve} from "./guards/books.resolve";
import {BookCardComponent} from "./book-card/book-card.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BookRoutingModule,
        MaterialModule,
        FlexModule,
        FlexLayoutModule,
        MatInputModule,
        CarouselModule

    ],
    exports: [
        BookCardComponent
    ],
    declarations: [
        BookComponent,
        BookPageComponent,
        BookFormComponent,
        BookMenuComponent,
        BookEstanteComponent,
        CarrouselComponent,
        BookAddDialogComponent,
        BookViewComponent,
        RatingComponent,
        BooksComponent,
        TagDialogComponent,
        BookCardComponent

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
