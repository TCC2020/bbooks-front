import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainExchangeComponent} from './main-exchange/main-exchange.component';
import {MyOffersComponent} from './my-offers/my-offers.component';
import {OffersComponent} from './offers/offers.component';
import {OfferViewComponent} from './offer-view/offer-view.component';
import {OfferNewComponent} from './offer-new/offer-new.component';
import {SendOfferRequestComponent} from './send-offer-request/send-offer-request.component';
import {MyExchangeComponent} from './my-exchange/my-exchange.component';
import {ExchangeReceivedComponent} from './exchange-received/exchange-received.component';
import {ExchangeSentComponent} from './exchange-sent/exchange-sent.component';
import {ExchangeViewComponent} from './exchange-view/exchange-view.component';
import {ChatComponent} from '../chat/chat.component';


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
                path: 'offers/:id',
                component: OfferViewComponent
            },
            {
                path: 'offers/:id/new',
                component: SendOfferRequestComponent
            },
            {
                path: 'my-exchanges',
                component: MyExchangeComponent,
                children: [
                    {
                        path: 'received',
                        component: ExchangeReceivedComponent
                    },
                    {
                        path: 'received/:id',
                        component: ExchangeViewComponent
                    },
                    {
                        path: 'received/:id/chat',
                        component: ChatComponent
                    },
                    {
                        path: 'sent',
                        component: ExchangeSentComponent
                    },
                    {
                        path: 'sent/:id',
                        component: ExchangeViewComponent
                    },
                    {
                        path: 'sent/:id/chat',
                        component: ChatComponent
                    },
                    { path: '', redirectTo: 'received', pathMatch: 'full' },
                ]
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
