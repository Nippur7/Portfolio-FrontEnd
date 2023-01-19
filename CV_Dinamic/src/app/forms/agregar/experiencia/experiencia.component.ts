import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, MasterserviceService } from 'src/app/service/masterservice.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent {

  closeResult = '';

  experienciaLabForm = new FormGroup({
	idLab: new FormArray([
		new FormGroup({
			idExp: new FormControl('',[Validators.required]),
			imagen: new FormControl('',[Validators.required]),
			lugar: new FormControl('',[Validators.required]),
			inicio: new FormControl('',[Validators.required]),
			fin: new FormControl('',[Validators.required]),
			idDetalles: new FormControl('',[Validators.required]),
			tipo: new FormControl('',[Validators.required]),
			obs: new FormControl('',[Validators.required]),
			idUser: new FormControl('',[Validators.required]),
			modificado: new FormControl('',[Validators.required]),
			detalles: new FormControl('',[Validators.required])
		})


	])

  })

	constructor(private modalService: NgbModal) {}

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
