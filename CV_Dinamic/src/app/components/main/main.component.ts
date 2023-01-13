import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','./bootstrap/bootstrap.min.css']
})
export class MainComponent implements OnInit{
datauser :any;
loggeado :boolean = false;

  constructor(private afAuth :AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,){

  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.datauser = user;
        this.loggeado = true
        this.toastr.info('Ahora puede modificar objetos','Modo de escritura');
      }else{
        this.router.navigate(['/main'])
        this.loggeado = false
        this.toastr.info('Para modificar objetos debe hacer LOGIN','Modo de sólo Lectura');
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/main']));
    this.loggeado = false;
  }
}
