import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Usuario } from '../Modelo/usuario';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { experiencia } from '../Modelo/experiencia';
import { detalle } from '../Modelo/detalle';

@Injectable({
  providedIn: 'root'
})
export class ServicehttpService {

  resp? : HttpErrorResponse;
  
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  Url='http://localhost:8081';

  //Métodos para Usuario
   public getUsuarios(){
    return this.http.get<Usuario[]>(this.Url+"/usuario")
  }

  public getUsuarioId(id:number){
    return this.http.get<Usuario>(this.Url+"/usuario/buscar/"+id)
    //.subscribe(()=>{},error => {this.errorHandler(error)})
    .pipe(catchError(this.errorHandler))
  }

  public getUsuarioEmail(email:String){
    return this.http.get<number>(this.Url+"/usuario/buscare/"+email)
    .pipe(catchError(this.errorHandler))
  }

  public editarUsuario(user:Usuario){
    this.http.put<HttpErrorResponse>(this.Url+"/usuario/editar", user)
      //.pipe(catchError(this.errorHandler)) 
        .subscribe(() =>{    
        },error => {this.errorHandler(error)
                  })
  }

  //Método para Experiencia

  public getExperiencia(id:number){
    return this.http.get<experiencia[]>(this.Url+"/experiencia/usuario/"+id)
    //.subscribe(()=>{},error => {this.errorHandler(error)})
    .pipe(catchError(this.errorHandler))
  }
  
  //Método para Detalle

  public getDetalle(id:number){
    return this.http.get<detalle>(this.Url+"/detalle/buscar/"+id)
    .pipe(catchError(this.errorHandler))
  }

  //Manejo de errores
  errorHandler(error: HttpErrorResponse){
    if(error.status === 200){
      this.toastr.success('Operación Realizada','Exito');
      
     }else{
      this.toastr.error('Operación NO exitosa');
      
     }
     return observableThrowError(error.status);
  }    

}
