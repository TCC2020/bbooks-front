import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { AuthConfirmComponent } from './auth-confirm/auth-confirm.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'confirm', component: AuthConfirmComponent }
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { CadastroSegundaEtapaComponent } from './views/cadastro-segunda-etapa/cadastro-segunda-etapa.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'cadastro', component: CadastroComponent
  },
  {
    path: 'cadastro/detalhes', component: CadastroSegundaEtapaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
