import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Usuario } from '../Modelo/usuario';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { experiencia } from '../Modelo/experiencia';
import { detalle } from '../Modelo/detalle';
import { Ctipo } from '../Modelo/tipo';
import { skill } from '../Modelo/skill';
import { proyecto } from '../Modelo/proyecto';
import { contacto } from '../Modelo/contacto';

@Injectable({
  providedIn: 'root'
})
export class ServicehttpService {

  resp? : HttpErrorResponse;
  
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  Url='http://localhost:8081';
  //Url='https://cv-argprog4-nippur7.koyeb.app'

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

  public editarUsuario(user:Usuario, file : File){
    const formData = new FormData();
    //console.log(user.email);
    //console.log(file.name);
    formData.append('userJson', JSON.stringify(user));
    formData.append('foto', file);
    //formData.forEach(item =>{
    //  console.log(item);
    //})
    // console.log(formData.get('userJson'));
    this.http.post<HttpErrorResponse>(this.Url+"/usuario/editar", formData,
    // {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // }
      )
      //.pipe(catchError(this.errorHandler)) 
        .subscribe(() =>{    
        },error => {this.errorHandler(error)
                  })
  }

  public traerImagen(filename : String) :string{

    return (this.Url+"/usuario/imagen/"+ filename)

  }

  //Método para Experiencia

  public getExperiencia(id:number){
    return this.http.get<experiencia[]>(this.Url+"/experiencia/usuario/"+id)
    //.subscribe(()=>{},error => {this.errorHandler(error)})
    .pipe(catchError(this.errorHandler))
  }

  public getExpId(id:number){
    return this.http.get<experiencia>(this.Url+"/experiencia/buscar/"+id)
  }

  public guardarExperiencia(exp:experiencia){
    this.http.post<HttpErrorResponse>(this.Url+"/experiencia/agregar", exp)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              })
  }
  
  //Método para Detalle

  public getDetalle(id:number){
    return this.http.get<detalle>(this.Url+"/detalle/buscar/"+id)
    .pipe(catchError(this.errorHandler))
  }

  public guardarDetalle(de: detalle){
    this.http.post<HttpErrorResponse>(this.Url+"/detalle/agregar",de)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              })
  }

  public obtenerDetalles(idu:number){
    return this.http.get<detalle[]>(this.Url+"/detalle/usuario/"+idu)
  }

  //Método para Tipo

  public getTipo(){
    return this.http.get<Ctipo[]>(this.Url+"/tipo")
  }

  public getTipoId(idE:number){
    return this.http.get<Ctipo>(this.Url+"/tipo/buscar/"+idE)
  }

  public guardarTipo(ti : Ctipo){
    this.http.post<HttpErrorResponse>(this.Url+"/tipo/agregar",ti)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              })
  }
  
  //Métodos para skill

  public getSkills(ids:number){
    return this.http.get<skill[]>(this.Url+"/skill/usuario/"+ids)
  }

  public obtenerSkill(id : number){
    return this.http.get<skill>(this.Url+"/skill/buscar/"+id)
  }

  public guardarSkill(sk : skill){
    this.http.post<HttpErrorResponse>(this.Url+"/skill/agregar",sk)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              console.log(error)
              })
  }

  //Métodos para proyecto

  public getProyectos(id:number){
    return this.http.get<proyecto[]>(this.Url+"/proyecto/usuario/"+id)
  }

  public obtenerProyecto(ids: number){
    return this.http.get<proyecto>(this.Url+"/proyecto/buscar/"+ids)
  }

  public guardarProyecto(pr : proyecto){
    this.http.post<HttpErrorResponse>(this.Url+"/proyecto/agregar", pr)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              console.log(error)
              })
              
  }

  //Métodos para contacto

  public getContacto(id:number){
    return this.http.get<contacto>(this.Url+"/contacto/usuario/"+id)
  }

  public obtenerContacto(idc:number){
    return this.http.get<contacto>(this.Url+"/contacto/buscar/"+idc)
  }
  
  public guardarPuesto(c:contacto){
    this.http.post<HttpErrorResponse>(this.Url+"/contacto/agregar",c)
    .subscribe(() =>{    
    },error => {this.errorHandler(error)
              console.log(error)
              })
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
