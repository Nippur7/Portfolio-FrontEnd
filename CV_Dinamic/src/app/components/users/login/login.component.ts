import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicefirebaseService } from 'src/app/service/servicefirebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseResp: ServicefirebaseService){
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      
    })

  }

  LogIn(){
    const email = this.loginUsuario.value.email;
    const pass = this.loginUsuario.value.password;

    this.loading = true;
    console.log(email, pass);
    this.afAuth.signInWithEmailAndPassword(email,pass)
    .then((user)=>{
      //this.router.navigate(['/main'])
      console.log(user);
      if(user.user?.emailVerified){
        this.router.navigate(['/main'])
      } else {
        this.toastr.warning('Revise su correo, debe validarlo..!!');
        this.loading = false;
      }
      
      
    }).catch((error)=>{
      this.loading = false;
      console.log(error)
      this.toastr.error(this.firebaseResp.firebaseerror(error.code), 'Error')
    })
  }
}
