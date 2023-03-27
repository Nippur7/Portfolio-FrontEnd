import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../Modelo/usuario';


import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { IUser, MasterserviceService } from 'src/app/service/masterservice.service';
import { UploadimageService } from 'src/app/service/uploadimage.service';
import { contacto } from 'src/app/Modelo/contacto';
import { concat, forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	@Input() idcontact! : number;
	//@Input() user$ : Observable<IUser>;
	@Output() contactEvent = new EventEmitter<contacto>();

  closeResult = '';

  //userForm : FormGroup; 

  usuarios? : Usuario[];
  usuario : Usuario;
  iduser : number = -1;
  preview: any;
  archivo: any;
  edited :boolean = false;
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
			//this.user$ = this.Mservice.loggingObservable;
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
		this.edited = false;
		if (this.idcontact < 0){
			console.log("Debe ingresar los datos para el contacto..!!");
			this.contactosql.iduser = this.usuario.idusuario;
			this.contactosql.email = this.usuario.email;
			this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				});

		}else{
			this.serviceHttp.obtenerContacto(this.idcontact)
    		.subscribe(datacontact =>{
      			this.contactosql = datacontact;
		
				this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				});

		//this.userForm.value.idUser = this.usuario?.id
			},error=>{
				console.log(this.idcontact)
			})
		}
	}

	ngOnInit(){		
		this.Mservice.loggingObservable.subscribe(datos=>{
		this.usuario = datos.userSql;		
		},error=>{
			console.log(error)

		});
		
		//this.user$ = this.Mservice.loggingObservable;
		// this.usuario = this
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

	public editUsuario(data: Usuario, image: File, con:contacto){
		if(data.picture.length ===0){
			console.log(data.picture)
			
		}else{
			if (!this.edited){
				console.log("no se edito la imagen")
			}
		}
		if(con.iduser < 0){
								
			this.serviceHttp.editarUsuario(data, image).then(() => {

					
			this.serviceHttp.getUsuarioEmail(data.email)
			.subscribe(u =>{
				this.usuario.idusuario = u;
				con.iduser = u;
				console.log(u)
				this.serviceHttp.guardarPuesto(con);
				this.contactEvent.emit(con)
				// this.Mservice.loggingObservableData = {userFireb: '', logging: true, userSql: this.dataSql};
				this.serviceHttp.getUsuarioId(u)
						        .subscribe(data=>{
                      this.Mservice.loggingObservableData = {userFireb: '', logging: true, userSql: data};
                      
						        },error=>{
                      console.log(error)
                      console.log("El usuario no existe en la BD, desea crearlo?")
                    })
				this.modalService.dismissAll();
			})
		})		

		}else{
			this.serviceHttp.editarUsuario(data, image);
			this.serviceHttp.guardarPuesto(con);
			this.contactEvent.emit(con)
			this.modalService.dismissAll();
		}
		
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
		this.edited = true;
	}

}
