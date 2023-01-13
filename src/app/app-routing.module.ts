import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {Error404Component} from './error404/error404.component';

const routes: Routes = [
  {path:'', component:MainComponent},
  {path:'login', component:LoginComponent},
  { path: '**', pathMatch: 'full', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
