import {RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {NgModule} from '@angular/core';

const feedRouter = [
    {
        path: '',
        component: MainComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(feedRouter)],
    exports: [RouterModule]
})
export class FeedPageRoutingModule { }
