import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicefirebaseService {

  constructor() { }

  firebaseerror(code: string){
    switch(code){
      case 'auth/wrong-password':
        return 'Contraseña incorrecta'
      case 'auth/user-not-found':
        return 'El correo no existe';

      //Correos existentes
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
