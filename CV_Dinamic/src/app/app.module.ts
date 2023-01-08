import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderEdComponent } from './components/slider-ed/slider-ed.component';
import { SliderExComponent } from './components/slider-ex/slider-ex.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ExperienciaComponent } from './forms/agregar/experiencia/experiencia.component';
import { UsuarioComponent } from './forms/agregar/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderEdComponent,
    SliderExComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ExperienciaComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
