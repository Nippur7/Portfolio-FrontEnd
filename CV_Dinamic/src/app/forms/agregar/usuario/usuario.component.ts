import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/Modelo/usuario';
import { ServicehttpService } from 'src/app/service/servicehttp.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  closeResult = '';

  userForm = new FormGroup({
		
			idUser: new FormControl('',[Validators.required]),
			apellido: new FormControl('',[Validators.required]),
			nombre: new FormControl('',[Validators.required]),
			email: new FormControl('',[Validators.required]),
			password: new FormControl('',[Validators.required]),			
			ingreso: new FormControl('',[Validators.required]),
			aboutme: new FormControl('',[Validators.required]),			
			imagen: new FormControl('',[Validators.required]),	
		
  })

  usuarios? : Usuario[];
	constructor(private modalService: NgbModal,
		private serviceHttp: ServicehttpService) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	ngOnInit(){
		this.serviceHttp.getPersonas()
		.subscribe(data=>{
			this.usuarios = data;
		});
		console.log(this.usuarios);
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

}
