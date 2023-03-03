import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Modelo/usuario';


import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { MasterserviceService } from 'src/app/service/masterservice.service';
import { UploadimageService } from 'src/app/service/uploadimage.service';
import { contacto } from 'src/app/Modelo/contacto';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	@Input() idcontact! : number;
	@Output() contactEvent = new EventEmitter<contacto>();

  closeResult = '';

  //userForm : FormGroup; 

  usuarios? : Usuario[];
  usuario : Usuario;
  iduser : number = -1;
  preview: any;
  archivo: any;
  public contactosql : contacto;
  //errorStatus : number =0
  //id_user: number = 0;
	constructor(private modalService: NgbModal,
		private serviceHttp: ServicehttpService,
		private Mservice : MasterserviceService,
		private conversor : UploadimageService
		//private fb: FormBuilder
		) {
			this.usuario = new Usuario;
			this.contactosql = new contacto;
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
		this.serviceHttp.obtenerContacto(this.idcontact)
    .subscribe(datacontact =>{
      this.contactosql = datacontact;
		
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

	public editUsuario(data: any, image: File, con:contacto){
		this.serviceHttp.editarUsuario(data, image);
		this.serviceHttp.guardarPuesto(con);
		this.contactEvent.emit(con)
		this.modalService.dismissAll();

	}

	public convertirFile(event: any) :any {
		//this.conversor.extraerBase64(event);		
		this.archivo = event.target.files[0];
		this.conversor.capturarFile(event)
		.then((respuesta: any) =>{
			this.preview = respuesta;
			//console.log(respuesta)
			this.usuario.picture = this.archivo.name;
			//console.log(this.archivo)
		})
		//console.log(this.preview)
	}

}
