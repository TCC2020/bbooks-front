import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BookRoutingModule} from './book.routing.module';
import {MDBBootstrapModule, NavbarComponent} from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from '../../guards/auth-guard';
import {Interceptor} from '../../guards/interceptor';


import { SidebarModule} from 'ng-sidebar';
import {BookMenuComponent} from './book-menu/book-menu.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BookEstanteComponent} from './book-estante/book-estante.component';
import {BookViewComponent} from './book-view/book-view.component';
import {BookPageComponent} from './book-page.component';
import {BookComponent} from '../../modals/book/book.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BookRoutingModule,
        MDBBootstrapModule.forRoot(),
        NgbModule,
        SidebarModule.forRoot(),
    ],
    exports: [],
    declarations: [
        BookComponent,
        BookPageComponent,
        BookFormComponent,
        BookViewComponent,
        BookMenuComponent,
        BookEstanteComponent
    ],
    providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
    bootstrap: [BookPageComponent]
})
export class BookModule {
}
