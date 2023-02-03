import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

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
import { RecuperarComponent } from './components/users/recuperar/recuperar.component';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MasterserviceService } from './service/masterservice.service';
import { DictionaryComponent } from './Modelo/diccionario';





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
    UsuarioComponent,
    RecuperarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    //MasterserviceService,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [MasterserviceService, DictionaryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
