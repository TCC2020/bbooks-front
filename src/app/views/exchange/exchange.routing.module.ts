import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainExchangeComponent} from './main-exchange/main-exchange.component';
import {MyOffersComponent} from './my-offers/my-offers.component';
import {OffersComponent} from './offers/offers.component';
import {OfferViewComponent} from './offer-view/offer-view.component';
import {OfferNewComponent} from './offer-new/offer-new.component';

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
                path: 'my-offers/create',
                component: OfferNewComponent
            },
            {
                path: 'my-offers/edit/:id',
                component: OfferNewComponent
            },
            {
                path: 'offers',
                component: OffersComponent
            },
            {
                path: 'offer/:id',
                component: OfferViewComponent
            },
            { path: '', redirectTo: 'offers', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(exchangeRouter)],
    exports: [RouterModule]
})
export class ExchangeRoutingModule { }
