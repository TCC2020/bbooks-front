import {BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MainPageComponent} from './views/main-page/main-page.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginComponent} from './modals/login/login.component';
import {AuthGuard} from './guards/auth-guard';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './guards/interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {AuthConfirmComponent} from './views/auth-confirm/auth-confirm.component';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {CadastroComponent} from './views/cadastro/cadastro.component';
import {CadastroSegundaEtapaComponent} from './views/cadastro-segunda-etapa/cadastro-segunda-etapa.component';
import {RecuperarSenhaComponent} from './views/recuperar-senha/recuperar-senha.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {NovaSenhaComponent} from './views/nova-senha/nova-senha.component';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {BookModule} from './views/book-page/book.module';
import {AuthVerifyLogin} from './guards/auth-verify-login';
import { UploadComponent } from './views/upload/upload.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PerfilPageModule} from './views/perfil-page/perfil-page.module';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import {SharedModule} from './views/shared/shared.module';
import { ReadingTargetProgressComponent } from './views/reading-target-progress/reading-target-progress.component';
import { PreviousGoalsComponent } from './views/previous-goals/previous-goals.component';
import {FeedPageModule} from './views/feed-page/feed-page.module';
import { GroupsModule } from './views/groups/groups.module';
import {ExchangeModule} from './views/exchange/exchange.module';
import {BnNgIdleService} from 'bn-ng-idle';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SearchModule} from './views/search/search.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LiteraryCompetitionComponent } from './views/literary-competition-page/literary-competition/literary-competition.component';
// tslint:disable-next-line:max-line-length
import { MembersLiteraryCompetitionComponent } from './views/literary-competition-page/members-literary-competition/members-literary-competition.component';
// tslint:disable-next-line:max-line-length
import { StoryLiteraryCompetitionComponent } from './views/literary-competition-page/story-literary-competition/story-literary-competition.component';
// tslint:disable-next-line:max-line-length
import { AdministratorsLiteraryCompetitionComponent } from './views/literary-competition-page/administrators-literary-competition/administrators-literary-competition.component';
// tslint:disable-next-line:max-line-length
import { CreateLiteraryCompetitionComponent } from './views/literary-competition-page/create-literary-competition/create-literary-competition.component';
// tslint:disable-next-line:max-line-length
import { ListLiteraryCompetitionComponent } from './views/literary-competition-page/list-literary-competition/list-literary-competition.component';
import { BooksSearchComponent } from './views/search/books-search/books-search.component';
import {LiteraryCompetitionModule} from './views/literary-competition-page/literary-competition.module';
import { BarCodeScannerComponent } from './views/shared/bar-code-scanner/bar-code-scanner.component';
import { VoteComponent } from './views/literary-competition-page/vote/vote.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        NavBarComponent,
        LoginComponent,
        AuthConfirmComponent,
        CadastroComponent,
        CadastroSegundaEtapaComponent,
        RecuperarSenhaComponent,
        NovaSenhaComponent,
        PageNotFoundComponent,
        PageNotFoundComponent,
        UploadComponent,
        ReadingTargetProgressComponent,
        PreviousGoalsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        BrowserAnimationsModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        SocialLoginModule,
        FeedPageModule,
        BookModule,
        ExchangeModule,
        LiteraryCompetitionModule,
        PerfilPageModule,
        SharedModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        GroupsModule,
        SearchModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        FontAwesomeModule
    ],
    providers: [
        BnNgIdleService,
        AuthVerifyLogin,
        AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher,
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment.gauth
                        ),
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider(
                            environment.fbauth
                        )
                    }
                ],
            } as SocialAuthServiceConfig
        }
    ],
    exports: [],

    bootstrap: [AppComponent]
})
export class AppModule {
}
