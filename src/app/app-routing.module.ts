import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { AuthConfirmComponent } from './auth-confirm/auth-confirm.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: '/confirm/:token', component: AuthConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
