import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { proyecto } from 'src/app/Modelo/proyecto';
import { skill } from 'src/app/Modelo/skill';
import { Usuario } from 'src/app/Modelo/usuario';
import { MasterserviceService } from 'src/app/service/masterservice.service';
import { ServicehttpService } from 'src/app/service/servicehttp.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent {

	@Input() idproyecto! : number;
	@Output() proyEvent = new EventEmitter<proyecto>();
  closeResult = '';
  proyectosql : proyecto;
  usuario : Usuario;

  constructor(private modalService: NgbModal,
		private serviceHttp: ServicehttpService,
    private Mservice : MasterserviceService
    ){
      this.proyectosql = new proyecto;
      this.usuario = new Usuario;
    }

    open(content: any) {
      this.serviceHttp.obtenerProyecto(this.idproyecto)
      .subscribe(dataproy =>{
        this.proyectosql = dataproy
          
       
      
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          },
        );
        //this.userForm.value.idUser = this.usuario?.id
      })
    }
  
    ngOnInit(){		
      this.Mservice.loggingObservable.subscribe(datos=>{
      this.usuario = datos.userSql;		
      })
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    public editProyecto(proye : proyecto){
      //console.log(habi)
      this.serviceHttp.guardarProyecto(proye)
      
      this.proyEvent.emit(proye)
      
      this.modalService.dismissAll();
  
    }

}
