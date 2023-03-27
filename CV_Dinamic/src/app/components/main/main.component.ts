import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ActiveToast, IndividualConfig, ToastrService, ToastrModule, Toast } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { Usuario } from 'src/app/Modelo/usuario';
import { IUser, MasterserviceService } from 'src/app/service/masterservice.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicehttpService } from 'src/app/service/servicehttp.service';
import { experiencia } from 'src/app/Modelo/experiencia';
import { detalle } from 'src/app/Modelo/detalle';
import { Ctipo } from 'src/app/Modelo/tipo';
import { DictionaryComponent } from 'src/app/Modelo/diccionario';
import { skill } from 'src/app/Modelo/skill';
import { proyecto } from 'src/app/Modelo/proyecto';
import { contacto } from 'src/app/Modelo/contacto';
import { ExperienciaComponent } from 'src/app/forms/agregar/experiencia/experiencia.component';
import { ToastComponentComponent } from '../toast-component/toast-component.component';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','./bootstrap/bootstrap.min.css']
})
export class MainComponent implements OnInit{

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
public nuevo : boolean = true;


@Output()
public datauserlog$: Observable<IUser>;

  iduser: number = -1;

  constructor(private afAuth :AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private toastrMod: ToastrModule,
    private Mservice : MasterserviceService,
    private httpService : ServicehttpService,
    private modalService: NgbModal,

    ){

      this.datauserlog$ = Mservice.loggingObservable;

      this.Mservice.loggingObservable.subscribe(exp =>{
        if(exp.userSql.idusuario != undefined){
          this.experienciaSql.length = 0;
          this.detalleSql.length = 0;
          this.tipoSql.length =0;
          this.habilidades.length = 0;
          this.proy.length = 0;
          this.dict = new DictionaryComponent
          this.httpService.getExperiencia(exp.userSql.idusuario)

            .subscribe(x => { 
   
              if (x != undefined){

                x.forEach( exp =>{
 
                  this.httpService.getDetalle(exp.iddetalles)
                    .subscribe(det =>{
                      
                      this.detalleSql.push(det)

                      exp.detexp = det

                    })
                    this.experienciaSql.push(exp);

                })

                this.httpService.getTipo().subscribe(t =>{
                  t.forEach(data =>{
                    this.tipoSql.push(data)
                  })

                  
                        // this.nuevo = false;
                        if (this.experienciaSql.length === 0){
                          console.log(this.experienciaSql)
                          this.nuevo = true;
                        }else{
                          this.nuevo = false;
                          for (var i=0;i<this.tipoSql.length;i++){
                            for (var ii=0;ii<this.experienciaSql.length;ii++){
                               if (this.tipoSql[i].idtipo === this.experienciaSql[ii].tipo){
                                this.dict.add(this.tipoSql[i].descripcion,this.experienciaSql[ii])
                        }
                        //console.log(this.experienciaSql)
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
            .subscribe(pp =>{
              this.proy = pp;
            
            })
            this.httpService.getContacto(exp.userSql.idusuario)
            .subscribe(c =>{
              this.contact = c;
             
            })
            
            this.picture = this.httpService.traerImagen(this.dataSql.picture)
            console.log(exp.userSql.picture)
            

        }else{      
          console.log("error atrapado", exp);

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
								console.log(this.iduser)
                if(this.iduser >= 0){
					        this.httpService.getUsuarioId(this.iduser)
						        .subscribe(data=>{
                      this.Mservice.loggingObservableData = {userFireb: user, logging: true, userSql: data};
                      
						        },error=>{
                      console.log(error)
                      console.log("El usuario no existe en la BD")
                    })
                }else{
                  console.log("El usuario no existe en la BD, desea crearlo?")
                  this.dataSql = new Usuario;
                  this.dataSql.email = user.email!;
                  this.dataSql.idusuario = this.iduser;                  
                  this.Mservice.loggingObservableData = {userFireb: user, logging: true, userSql: this.dataSql};
                  console.log(this.dataSql)
                }
			
		      })
        

        this.datauserlog$ = this.Mservice.loggingObservable;
        this.datauserlog$.subscribe(datos =>{
          this.dataSql = datos.userSql
        })


        this.toastr.info('Ahora puede modificar objetos','Modo de escritura');

      }else{
        this.router.navigate(['/main'])
        this.loggeado = false;  
  
        this.toastr.info('Para modificar objetos debe hacer LOGIN','Modo de sólo Lectura');
        var usuario: Observable<Usuario[]>;
        usuario = this.httpService.getUsuarios()

        usuario.forEach(value =>{

          this.dataSql = value[0];
  
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

  public eliminarExp(t: string,index :number){
    
    this.toastr.warning('¿Desea eliminar el ítem?', '¡Clickéame para confirmar! // Cerrar para cancelar',
    {
      closeButton: true,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-full-width'

    })
    .onTap
    .pipe(take(1))
    .subscribe(() => {
      console.log('Proyecto tipo ', t, " indice ", index);
      this.httpService.eliminarExp(this.dict.get(t)[index].idexperiencia).then(()=>{
        this.httpService.eliminarDet(this.dict.get(t)[index].iddetalles)
        this.dict.eliminar(t,index)
      })
      // this.httpService.eliminarDet(this.dict.get(t)[index].iddetalles)
      // this.dict.eliminar(t,index)
      
      
    });
    
    // console.log("boton eliminar experiencia" ,index, t)
    // console.log(this.dict.get(t))
    //this.dict.eliminar(t,index)
    // console.log(this.dict.get(t))
  }

  eliminarDetalle(){
    console.log("eliminar detalle")
  }

  agregarExp(t: string){
    console.log("Agregar experiencia ",t)
    this.data.length = 0;
    this.experienciaComponent.open();
  }

  agregarExperiencia($event:any[]){
    
    
    
    var ind : number = this.dict.get($event[1].descripcion).length;
    console.log("el indice a agregar es ",ind)
    console.log($event)
    //this.dict.mod($event[1].descripcion,ind,$event)
    $event[0].detexp = $event[2]
    this.dict.add($event[1].descripcion,$event[0])
    this.nuevo = false;
    this.aux = Object.keys(this.dict['dictionary'])
    //console.log(this.dict)

  }

  public modificarExp(index: string, index2 : number, diccionario :any){
    
   
    this.data.length = 0;
    this.data.push(diccionario.get(index)[index2].tipo);
    this.data.push(diccionario.get(index)[index2].idexperiencia);
    this.data.push(diccionario.get(index)[index2].iddetalles); 

    this.experienciaComponent.open();

  }

  public actualizarExp($event:any[]){
    var iindex : number = 0;

    for (let element of this.dict.get($event[1].descripcion)){
      if (element.idexperiencia === $event[0].idexperiencia){        
        break;
      } else{
        iindex = iindex +1
      }
    }    
    this.dict.mod($event[1].descripcion,iindex,$event)    
  }

  modificarAbout(){
    console.log("mod acerca de mesmo");

  }

  public actualizarUsuario($event:contacto){
    console.log($event)
    this.contact = $event    
    this.datauserlog$.subscribe(datos =>{
          this.dataSql = datos.userSql
          console.log(this.dataSql.idusuario)
        })
  }

  cargarDic(t:Ctipo[],exp :experiencia[]){
  
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
  
  public actualizarSkill($event:skill, i:number){
    this.habilidades[i] = $event;
  }

  public agregarSkill($hab: skill){
    this.habilidades.push($hab)
    console.log("agregar habilidad")
  }

  public eliminarSkill(ind : number, id:number){
    
    this.toastr.warning('¿Desea eliminar el ítem?', '¡Clickéame para confirmar! // Cerrar para cancelar',
    {
      closeButton: true,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-full-width'

    })
    .onTap
    .pipe(take(1))
    .subscribe(() => {
      console.log('Proyecto id', id);
      this.httpService.eliminarSkill(id)      
      this.habilidades.splice(ind,1)
      
      
    });
    
    
  }

  public actualizarProy($event:proyecto, i:number){
    this.proy[i] = $event;
  }

  public agregarProy($event:proyecto){
    this.proy.push($event)
    console.log("agregar proyecto")
  }

  public eliminarProy(ind:number, proye: number){
    
    this.toastr.warning('¿Desea eliminar el ítem?', '¡Clickéame para confirmar! // Cerrar para cancelar',
    {
      closeButton: true,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-full-width'

    })
    .onTap
    .pipe(take(1))
    .subscribe(() => {
      console.log('Proyecto id', proye);
      this.httpService.eliminarProy(proye)      
      this.proy.splice(ind,1);
      
      
    });

    
  }

}

