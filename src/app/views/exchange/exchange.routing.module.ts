import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainExchangeComponent} from './main-exchange/main-exchange.component';
import {MyOffersComponent} from './my-offers/my-offers.component';
import {OffersComponent} from './offers/offers.component';
import {OfferViewComponent} from './offer-view/offer-view.component';

const exchangeRouter = [
    {
        path: 'exchange',
        component: MainExchangeComponent,
        children: [
            {
                path: 'my-offers',
                component: MyOffersComponent
            },
            {
                path: 'offers',
                component: OffersComponent
            },
            {
                path: 'offer/:idOffer',
                component: OfferViewComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(exchangeRouter)],
    exports: [RouterModule]
})
export class ExchangeRoutingModule { }
