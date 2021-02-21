import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainExchangeComponent} from './main-exchange/main-exchange.component';
import {ExchangeRoutingModule} from './exchange.routing.module';
import {SharedModule} from '../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {MyOffersComponent} from './my-offers/my-offers.component';
import {OffersComponent} from './offers/offers.component';
import {OfferViewComponent} from './offer-view/offer-view.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {OfferNewComponent} from './offer-new/offer-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {FilterAsyncPipe} from './pipes/filter-async.pipe';
import {SearchBookAdtoComponent} from './search-book-adto/search-book-adto.component';
import {SendOfferRequestComponent} from './send-offer-request/send-offer-request.component';
import {MyExchangeComponent} from './my-exchange/my-exchange.component';
import {ExchangeReceivedComponent} from './exchange-received/exchange-received.component';
import {ExchangeSentComponent} from './exchange-sent/exchange-sent.component';


@NgModule({
    declarations: [
        MainExchangeComponent,
        MyOffersComponent,
        OffersComponent,
        OfferViewComponent,
        OfferNewComponent,
        FilterAsyncPipe,
        SearchBookAdtoComponent,
        SendOfferRequestComponent,
        MyExchangeComponent,
        ExchangeReceivedComponent,
        ExchangeSentComponent
    ],
    imports: [
        CommonModule,
        ExchangeRoutingModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        CarouselModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class ExchangeModule {
}
