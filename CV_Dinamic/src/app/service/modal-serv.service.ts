import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExperienciaComponent } from '../forms/agregar/experiencia/experiencia.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServService {

private openModalSubject = new Subject<any>();
openModal$ = this.openModalSubject.asObservable();

  constructor() { }

openModal() {
  this.openModalSubject.next(ExperienciaComponent);
  }

}
