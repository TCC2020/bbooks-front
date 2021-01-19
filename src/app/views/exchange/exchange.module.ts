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


@NgModule({
    declarations: [
        MainExchangeComponent,
        MyOffersComponent,
        OffersComponent,
        OfferViewComponent
    ],
    imports: [
        CommonModule,
        ExchangeRoutingModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        CarouselModule
    ]
})
export class ExchangeModule {
}
