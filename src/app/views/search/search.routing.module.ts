import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const searchRouter = [


];

@NgModule({
    imports: [RouterModule.forChild(searchRouter)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
