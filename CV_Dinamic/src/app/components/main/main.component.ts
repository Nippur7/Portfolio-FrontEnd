import { Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Modelo/usuario';
import { IUser, MasterserviceService } from 'src/app/service/masterservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { experiencia } from 'src/app/Modelo/experiencia';
import { detalle } from 'src/app/Modelo/detalle';
import { Ctipo } from 'src/app/Modelo/tipo';
import { DictionaryComponent } from 'src/app/Modelo/diccionario';
import { skill } from 'src/app/Modelo/skill';
import { proyecto } from 'src/app/Modelo/proyecto';
import { contacto } from 'src/app/Modelo/contacto';
import { HttpResponse } from '@angular/common/http';
import { ExperienciaComponent } from 'src/app/forms/agregar/experiencia/experiencia.component';
//import { ModalServService } from '../../service/modal-serv.service';
//import { abrirMod } from '../../forms/agregar/experiencia/experiencia.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','./bootstrap/bootstrap.min.css']
})
export class MainComponent implements OnInit{
// @ViewChild('contentExp', {static:true}) contentExp: TemplateRef<any> | undefined;
  @ViewChild(ExperienciaComponent)
  experienciaComponent!: ExperienciaComponent;
datauser :any;
loggeado :boolean = false;
public dataSql: Usuario = new Usuario;
public experienciaSql: experiencia[] = [];
public detalleSql: detalle[] = [];
public tipoSql: Ctipo[] = [];
public dict : DictionaryComponent = new DictionaryComponent;
public aux :any[] = [];
public habilidades : skill[] = [];
public proy : proyecto[] = [];
public contact : contacto = new contacto;
public picture : string = '';
public data :number[] = [];
//public experienciaTipo : DictionaryComponent = new DictionaryComponent; 

@Output()
public datauserlog$: Observable<IUser>;
//private id : number = -1;
  iduser: number = -1;

  constructor(private afAuth :AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private Mservice : MasterserviceService,
    private httpService : ServicehttpService,
    private modalService: NgbModal,
    //private modalS: modalService
    //private dict : DictionaryComponent
    ){
      //this.contentExp = null;
      this.datauserlog$ = Mservice.loggingObservable;
      //dict
      this.Mservice.loggingObservable.subscribe(exp =>{
        if(exp.userSql.idusuario != undefined){
          this.experienciaSql.length = 0;
          this.detalleSql.length = 0;
          this.tipoSql.length =0;
          this.habilidades.length = 0;
          this.proy.length = 0;
          this.dict = new DictionaryComponent
          this.httpService.getExperiencia(exp.userSql.idusuario)

            .subscribe(x => { //.forEach
   
              if (x != undefined){
                //this.experienciaSql = x
                x.forEach( exp =>{
 
                  this.httpService.getDetalle(exp.iddetalles)
                    .subscribe(det =>{
                      
                      this.detalleSql.push(det)
                      //console.log(det)
                      exp.detexp = det
                      //console.log(exp.detexp)
                    })
                    this.experienciaSql.push(exp);
                    //console.log(exp)
                })
                //console.log(this.experienciaSql[0])
                this.httpService.getTipo().subscribe(t =>{
                  t.forEach(data =>{
                    this.tipoSql.push(data)
                  })

                  for (var i=0;i<this.tipoSql.length;i++){
                    for (var ii=0;ii<this.experienciaSql.length;ii++){
                       if (this.tipoSql[i].idtipo === this.experienciaSql[ii].tipo){
                        this.dict.add(this.tipoSql[i].descripcion,this.experienciaSql[ii])
                        //console.log(i)
                      }
                    }
                  }
               
                  this.aux = Object.keys(this.dict['dictionary'])
                  
                })
              }else{
                console.log("experiencia no definida")
                
              }
            });
           
            this.httpService.getSkills(exp.userSql.idusuario)
            .subscribe(hab =>{
              this.habilidades = hab;
             
            })
            this.httpService.getProyectos(exp.userSql.idusuario)
            .subscribe(p =>{
              this.proy = p;
            
            })
            this.httpService.getContacto(exp.userSql.idusuario)
            .subscribe(c =>{
              this.contact = c;
             
            })
            
            this.picture = this.httpService.traerImagen(this.dataSql.picture)
            console.log(exp.userSql.picture)
            

        }else{      
          console.log("error atrapado");
        }
   
      })

         
    }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.datauser = user;
        
        this.loggeado = true;
        this.httpService.getUsuarioEmail(this.datauser.email)
					.subscribe(id=>{
								this.iduser = id;
								
					      this.httpService.getUsuarioId(this.iduser)
						      .subscribe(data=>{
                    this.Mservice.loggingObservableData = {userFireb: user, logging: true, userSql: data};
							  
						      })
			
		      })
        

        this.datauserlog$ = this.Mservice.loggingObservable;
        this.datauserlog$.subscribe(datos =>{
          this.dataSql = datos.userSql
        })


        this.toastr.info('Ahora puede modificar objetos','Modo de escritura');

      }else{
        this.router.navigate(['/main'])
        this.loggeado = false;  
        //this.Mservice.loggingObservableData = {user: user, logging: false};
        this.toastr.info('Para modificar objetos debe hacer LOGIN','Modo de sólo Lectura');
        var usuario: Observable<Usuario[]>;
        usuario = this.httpService.getUsuarios()
        //console.log(this.Mservice.loggingObservable)
        //this.Mservice.UnLogged
        usuario.forEach(value =>{
        //console.log(value[0])
          this.dataSql = value[0];
          //console.log(this.dataSql)
          this.Mservice.loggingObservableData = {userFireb: '', logging: true, userSql: this.dataSql};
        });
      }    
    });   
    
  }

  logOut(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/main']));
    //console.log(this.Mservice.loggingObservable)
    this.loggeado = false;
    //this.Mservice.Logged();
  }

  public eliminarExp(){
    console.log("boton eliminar experiencia")
  }

  eliminarDetalle(){
    console.log("eliminar detalle")
  }

  agregarExp(){
    console.log("Agregar experiencia")
  }

  public modificarExp(index: string, index2 : number, diccionario :any){
    
    // diccionario.get(index).((d:any)=>{
    console.log("modificar experiencia "+ JSON.stringify(diccionario.get(index)[index2]))    
    this.data.length = 0;
    this.data.push(diccionario.get(index)[index2].tipo);
    this.data.push(diccionario.get(index)[index2].idexperiencia);
    this.data.push(diccionario.get(index)[index2].iddetalles); 
    //console.log(this.data)
    // this.experienciaComponent.message = {
    //   tipo:diccionario.get(index)[index2].tipo,
    //   idexperiencia:diccionario.get(index)[index2].idexperiencia,
    //   iddetalles:diccionario.get(index)[index2].iddetalles
    // };
    this.experienciaComponent.open();
    //const modalRef = this.modalService.open(ExperienciaComponent);
    //modalRef.componentInstance.message = experiencia;
  }

  modificarAbout(){
    console.log("mod acerca de mesmo");

  }

  cargarDic(t:Ctipo[],exp :experiencia[]){
    // const diccionario: DictionaryComponent = new DictionaryComponent;
    for (var ii of t){
      for (var i of exp){
        if (ii.idtipo.toString() === i.tipo.toString()){
          this.dict.add(ii.idtipo.toString(),i)
          console.log(i)
        }else{
        console.log(i.tipo.toString())
        }
      }
    }   
    return this.dict;
  }
  

}

