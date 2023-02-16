import { Component, OnInit, Output } from '@angular/core';
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



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss','./bootstrap/bootstrap.min.css']
})
export class MainComponent implements OnInit{
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
    //private dict : DictionaryComponent
    ){
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
            //.subscribe(value=>{
                //this.experienciaSql = value;
                //console.log(this.experienciaSql)
            //})
            .subscribe(x => { //.forEach
              //console.log(x)
              // this.experienciaSql.push(x.values);
              if (x != undefined){
                //this.experienciaSql = x
                x.forEach( exp =>{
                  //console.log(exp)
                  //this.experienciaSql.push(exp); //ultima mod
                  //console.log(this.experienciaSql)
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
                  //this.dict.add(this.tipoSql[1].descripcion,this.experienciaSql)
                  //this.experienciaSql.find()
                  //console.log(this.experienciaSql)
                  for (var i=0;i<this.tipoSql.length;i++){
                    for (var ii=0;ii<this.experienciaSql.length;ii++){
                       if (this.tipoSql[i].idtipo === this.experienciaSql[ii].tipo){
                        this.dict.add(this.tipoSql[i].descripcion,this.experienciaSql[ii])
                        //console.log(i)
                      }
                    }
                  }
                  //console.log(this.dict['dictionary']['Estudio'])
                  this.aux = Object.keys(this.dict['dictionary'])
                  //console.log(this.aux);
                })
              }else{
                console.log("experiencia no definida")
                
              }
            });
            //console.log(exp.userSql.idusuario)
            this.httpService.getSkills(exp.userSql.idusuario)
            .subscribe(hab =>{
              this.habilidades = hab;
              //console.log(hab)
            })
            this.httpService.getProyectos(exp.userSql.idusuario)
            .subscribe(p =>{
              this.proy = p;
              //console.log(this.proy)
            })
            // console.log(this.detalleSql);
            //console.log(this.dict['dictionary']['Estudio'])
        }else{      
          console.log("error atrapado");
        }
        //console.log(this.dict);
      })
      
      //  bloque que define el diccionario junto con la experiencia
      // this.httpService.getTipo().subscribe(t =>{
      //   t.forEach(data =>{
      //     this.tipoSql.push(data)
      //   })
      //   this.dict.add(this.tipoSql[1].descripcion,this.experienciaSql)
      //   //this.experienciaSql.find()
     
      // })      
      
      //console.log(this.dict['dictionary']['Estudio']);
      //this.aux = Object.keys(this.dict['dictionary'])
      // console.log(this.aux);
      
         
    }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user =>{
      if(user && user.emailVerified){
        this.datauser = user;
        //this.Mservice.setdatauser(user)
        this.loggeado = true;
        this.httpService.getUsuarioEmail(this.datauser.email)
					.subscribe(id=>{
								this.iduser = id;
								//console.log(this.iduser)
					      this.httpService.getUsuarioId(this.iduser)
						      .subscribe(data=>{
                    this.Mservice.loggingObservableData = {userFireb: user, logging: true, userSql: data};
							      //console.log(this.usuario.email)});
						      })
			
		      })
        
        //this.Mservice.loggingObservableData.logging = true;
        this.datauserlog$ = this.Mservice.loggingObservable;
        this.datauserlog$.subscribe(datos =>{
          this.dataSql = datos.userSql
        })
        //console.log(this.Mservice.loggingObservable)
        //console.log(this.data$)
        //this.Mservice.Logged()        
        //this.httpService.getUsuarioEmail(user.email);
        //console.log(this.id);

        this.toastr.info('Ahora puede modificar objetos','Modo de escritura');
        //this.experienciaSql.length = 0;
        //this.detalleSql.length = 0;
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

  elimnarExp(){
    console.log("boton eliminar experiencia")
  }

  eliminarDetalle(){
    console.log("eliminar detalle")
  }

  agregarExp(){
    console.log("Agregar experiencia")
  }

  modificarExp(){
    console.log("modificar experiencia")
    //<app->
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

