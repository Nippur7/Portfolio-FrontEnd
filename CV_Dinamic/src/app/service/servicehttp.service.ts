import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../Modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicehttpService {

  constructor(private http: HttpClient,) { }

  Url='http://localhost:8081/usuario';

  getPersonas(){
    return this.http.get<Usuario[]>(this.Url)
  }
}
