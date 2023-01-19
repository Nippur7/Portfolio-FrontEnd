import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUser, MasterserviceService } from 'src/app/service/masterservice.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','./bootstrap/bootstrap.min.css']
})
export class MainComponent implements OnInit{
datauser :any;
loggeado :boolean = false;
@Output()
public data$: Observable<IUser>;

  constructor(private afAuth :AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private Mservice : MasterserviceService){
      this.data$ = Mservice.loggingObservable;
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.datauser = user;
        //this.Mservice.setdatauser(user)
        this.loggeado = true;
        this.Mservice.loggingObservableData = {user: user, logging: true};
        //this.Mservice.loggingObservableData.logging = true;
        this.data$ = this.Mservice.loggingObservable;
        console.log(this.Mservice.loggingObservable)
        //console.log(this.data$)
        //this.Mservice.Logged()
        this.toastr.info('Ahora puede modificar objetos','Modo de escritura');
      }else{
        this.router.navigate(['/main'])
        this.loggeado = false
        console.log(this.Mservice.loggingObservable)
        //this.Mservice.UnLogged
        this.toastr.info('Para modificar objetos debe hacer LOGIN','Modo de sólo Lectura');
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/main']));
    console.log(this.Mservice.loggingObservable)
    this.loggeado = false;
    //this.Mservice.Logged();
  }

  elimnarExp(){
    console.log("boton eliminar experiencia")
  }

  eliminarDetalle(){
    console.log("eliminar detalle")
  }

  agregarExp(){
    console.log("Agregar experiencia")
  }

  modificarExp(){
    console.log("modificar experiencia")
  }

  modificarAbout(){
    console.log("mod acerca de mesmo");
  }
}
