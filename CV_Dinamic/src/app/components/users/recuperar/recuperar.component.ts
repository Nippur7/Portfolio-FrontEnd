import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicefirebaseService } from 'src/app/service/servicefirebase.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent {

  recuperarUsuario : FormGroup;
  loading: boolean = false;

  constructor(private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseerr: ServicefirebaseService){
    this.recuperarUsuario = this.fb.group({
      email: ['', Validators.required]
    })

  }

  recuperar(){
    const correo = this.recuperarUsuario.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(correo).then(()=>{
      this.toastr.info(correo, 'Correo enviado, Revise la bandeja de SPAM');
      this.router.navigate(['/login']);
    }).catch((error)=>{
      this.loading=false;
      this.toastr.error(this.firebaseerr.firebaseerror(error.code), 'Error');
    })
  }

}
