import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        PublicProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PublicProfilePageModule {
}
