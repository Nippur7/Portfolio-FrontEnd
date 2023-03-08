import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { skill } from 'src/app/Modelo/skill';
import { Usuario } from 'src/app/Modelo/usuario';
import { MasterserviceService } from 'src/app/service/masterservice.service';
import { ServicehttpService } from 'src/app/service/servicehttp.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
	@Input() idskill! : number;
	@Input() iconos!:string[];
	@Output() messageEvent = new EventEmitter<skill>();
  closeResult = '';
  public habilidad : skill;
  usuario : Usuario;
  
  constructor(private modalService: NgbModal,
		private serviceHttp: ServicehttpService,
    private Mservice : MasterserviceService
    ){
      this.habilidad = new skill
      this.usuario = new Usuario;
  }
  
  open(content: any) {
    if(this.idskill >=0){

	
	this.serviceHttp.obtenerSkill(this.idskill)
    .subscribe(dataskill =>{
      this.habilidad = dataskill
        
     
    
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
	}else{
		this.habilidad.iduser = this.usuario.idusuario;

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
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

	public editSkill(habi : skill){
		//console.log(habi)
		this.serviceHttp.guardarSkill(habi);
		this.serviceHttp.getSkills(habi.iduser)
		.subscribe(resp =>{
			console.log(resp)
			habi.idskill = resp.slice(-1)[0].idskill
			this.messageEvent.emit(habi);		
			this.modalService.dismissAll();
		})
		
		

	}
  

}
