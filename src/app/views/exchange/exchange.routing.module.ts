import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainExchangeComponent} from './main-exchange/main-exchange.component';
import {MyOffersComponent} from './my-offers/my-offers.component';

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
                component: MyOffersComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(exchangeRouter)],
    exports: [RouterModule]
})
export class ExchangeRoutingModule { }
