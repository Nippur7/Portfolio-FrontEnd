import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { SliderEdComponent } from './components/slider-ed/slider-ed.component';
import { SliderExComponent } from './components/slider-ex/slider-ex.component';
import { LoginComponent } from './components/users/login/login.component';
import { RecuperarComponent } from './components/users/recuperar/recuperar.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ExperienciaComponent } from './forms/agregar/experiencia/experiencia.component';
import { UsuarioComponent } from './forms/agregar/usuario/usuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'recuperar', component: RecuperarComponent},
  { path: 'sliderex', component: SliderExComponent},
  { path: 'slidered', component: SliderEdComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
