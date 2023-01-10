import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrarUsuario : FormGroup;

  constructor(private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService){
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
      return
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) =>{
      this.toastr.success(email, 'Creado');
    }).catch((error) => {
      console.log(error);
      this.toastr.error(this.firebaseerror(error.code), 'Error');
      
    })
  }
  firebaseerror(code: string){
    switch(code){
      case 'auth/email-already-in-use':
        return 'Email ya existe'
      case 'auth/invalid-email':
        return 'Email inválido'
      case 'auth/weak-password':
        return 'Contraseña muy débil'  
      default:
        return 'Error desconocido'
    }
  }

}
