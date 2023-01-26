import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Modelo/usuario';


import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { MasterserviceService } from 'src/app/service/masterservice.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  closeResult = '';

  //userForm : FormGroup; 

  usuarios? : Usuario[];
  usuario? : Usuario;
  iduser : number = -1;
  //errorStatus : number =0
  //id_user: number = 0;
	constructor(private modalService: NgbModal,
		private serviceHttp: ServicehttpService,
		private Mservice : MasterserviceService
		//private fb: FormBuilder
		) {
			
			//this.userForm = new FormGroup({
		
			//	idUser: new FormControl(0,[Validators.required]),
			//	apellido: new FormControl('',[Validators.required]),
			//	nombre: new FormControl('',[Validators.required]),
			//	email: new FormControl('',[Validators.required]),
			//	password: new FormControl('',[Validators.required]),			
			//	ingreso: new FormControl('',[Validators.required]),
			//	aboutme: new FormControl('',[Validators.required]),			
			//	imagen: new FormControl('',[Validators.required]),	
			
	  }
		

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
		//this.userForm.value.idUser = this.usuario?.id
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

	public editUsuario(data: any){
		this.serviceHttp.editarUsuario(data);
		
		this.modalService.dismissAll();

	}

}
