import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BookRoutingModule} from './book.routing.module';
import {AuthGuard} from '../../guards/auth-guard';
import {Interceptor} from '../../guards/interceptor';
import {BookMenuComponent} from './book-menu/book-menu.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookPageComponent} from './book-page.component';
import {BookComponent} from '../../modals/book/book.component';
import {BookcaseModalComponent} from './bookcase-modal/bookcase-modal.component';
import {MaterialModule} from "../../material/material.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {CarouselModule} from "ngx-owl-carousel-o";
import {BookLibraryComponent} from "./book-library/book-library.component";
import {CarrouselComponent} from "./book-library/carrousel/carrousel.component";


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
    exports: [],
    declarations: [
        BookComponent,
        BookPageComponent,
        BookFormComponent,
        BookMenuComponent,
        BookEstanteComponent,
        BookcaseModalComponent,
        BookLibraryComponent,
        CarrouselComponent

    ],
    entryComponents: [
        // BookcaseModalComponent
    ],
    providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
    bootstrap: [BookPageComponent],
})
export class BookModule {
}
