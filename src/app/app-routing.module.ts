import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import {BookPageComponent} from './views/book-page/book-page.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'book', component: BookPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
