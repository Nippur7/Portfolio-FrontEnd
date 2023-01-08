import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SliderEdComponent } from './components/slider-ed/slider-ed.component';
import { SliderExComponent } from './components/slider-ex/slider-ex.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'sliderex', component: SliderExComponent},
  { path: 'slidered', component: SliderEdComponent},
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
