import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ctipo } from 'src/app/Modelo/tipo';
import { experiencia } from 'src/app/Modelo/experiencia';
import { detalle } from 'src/app/Modelo/detalle';
import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { Usuario } from 'src/app/Modelo/usuario';
import { MasterserviceService } from 'src/app/service/masterservice.service';



@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements AfterViewInit{
	@Input() message!: number[];
	@Input() modal!:NgbActiveModal;
	@ViewChild('contentExp') contentExp: any;
	@Output() actexpEvent = new EventEmitter<any[]>()

  	closeResult = '';
  	tiposql : Ctipo;
  	experienciasql : experiencia;
  	detallesql : detalle;
	mensajeexp : any[];
	agregar : boolean = false;
	usuario : Usuario;



	constructor(public modalService: NgbModal,
		private serviceHttp : ServicehttpService,
		private Mservice : MasterserviceService

		) {
			this.detallesql = new detalle;
			this.experienciasql = new experiencia;
			this.tiposql = new Ctipo;
			this.mensajeexp = [];
			this.usuario = new Usuario;
		}
	ngAfterViewInit(): void {}

	ngOnInit(){		
		this.Mservice.loggingObservable.subscribe(datos=>{
		this.usuario = datos.userSql;		
		})
	}


	//open(content: any) {
	open() {	
	if (this.message.length === 0){
		console.log("vamos bien, aqui viene el codigo para agregar")
		this.agregar = true;
		this.detallesql = new detalle;
		this.detallesql.iduser = this.usuario.idusuario
		this.experienciasql = new experiencia;
		this.experienciasql.iduser = this.usuario.idusuario
		this.tiposql = new Ctipo;
		this.mensajeexp.length = 0;
		this.modalService.open(this.contentExp, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

	}else{
		//console.log(this.message[0]);
		this.agregar = false;
		this.serviceHttp.getTipoId(this.message[0])
		.subscribe((Tid:Ctipo) =>{
			this.tiposql = Tid
			//console.log(Tid)
			this.serviceHttp.getExpId(this.message[1])
			.subscribe((Tex :experiencia) =>{
				this.experienciasql = Tex
				//console.log(Tex)
				this.serviceHttp.getDetalle(this.message[2])
				.subscribe((Tde: detalle)=>{
					this.detallesql = Tde
					//console.log(Tde)

		
		//this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		this.modalService.open(this.contentExp, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
				})
			})
		})
	}	
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
	public guardarDatos(exp:experiencia,ti:Ctipo,de:detalle){
		//console.log(ti)
		this.mensajeexp.length=0;
		if(this.agregar){
			//this.serviceHttp.guardarDetalle(de);
			//console.log("agregar detalle ", de)
			this.serviceHttp.guardarDetalle(de);
			var detUsu : detalle[] = []
			this.serviceHttp.obtenerDetalles(this.usuario.idusuario)
			.subscribe((d)=>{
				//detUsu.push(d)
				console.log(d)
				detUsu = d
				//console.log(detUsu.slice(-1)[0])
				exp.iddetalles = detUsu.slice(-1)[0].iddetalles
				//exp.detexp = detUsu.slice(-1)[0];
				this.serviceHttp.getTipo()
				.subscribe(tt =>{
					var found :boolean = false;
					tt.forEach(ttt=>{
						
						if(ttt.descripcion === ti.descripcion){
							ti.idtipo = ttt.idtipo;
							found = true
							//break;
						}
						
					})
					if(found){
						console.log("no se agrega otro tipo")
					}else{
						console.log("se agrega otro tipo")
					}
					exp.tipo = ti.idtipo
					this.serviceHttp.guardarExperiencia(exp);
				})
				

			})
			//console.log(detUsu.slice(-1)[0])
		}else{
			
			this.serviceHttp.guardarTipo(ti);
			this.serviceHttp.guardarDetalle(de);
			this.serviceHttp.guardarExperiencia(exp);
		}
		this.mensajeexp.push(exp);
		this.mensajeexp.push(ti)
		this.mensajeexp.push(de)
		this.actexpEvent.emit(this.mensajeexp)
		//console.log(this.mensajeexp)
		this.modalService.dismissAll();
	
	}
}
