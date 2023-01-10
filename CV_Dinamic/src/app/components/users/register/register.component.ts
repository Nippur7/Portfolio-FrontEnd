import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ServicefirebaseService } from 'src/app/service/servicefirebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrarUsuario : FormGroup;
  loading: boolean = false;

  constructor(private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseerr: ServicefirebaseService){
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPass: ['', Validators.required]
    })

  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirpass = this.registrarUsuario.value.repetirPass

    if(password !== repetirpass){
      this.toastr.error('Contraseñas no coinciden','Error en Password');
      return;
    }    
    this.loading = true;
    this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((user) =>{
      this.router.navigate(['/login'])
      this.loading = false;
      this.toastr.success(email, 'Creado');
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      this.toastr.error(this.firebaseerr.firebaseerror(error.code), 'Error');
      
    })
  }


}
