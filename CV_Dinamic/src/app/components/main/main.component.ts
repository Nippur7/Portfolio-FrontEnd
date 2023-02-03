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
import { tipo } from 'src/app/Modelo/tipo';
import { DictionaryComponent } from 'src/app/Modelo/diccionario';


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
public tipoSql: tipo[] = [];
//public experienciaTipo : DictionaryComponent = new DictionaryComponent; 

@Output()
public datauserlog$: Observable<IUser>;
private id : number = -1;
  iduser: number = -1;

  constructor(private afAuth :AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private Mservice : MasterserviceService,
    private httpService : ServicehttpService,
    private dict : DictionaryComponent
    ){
      this.datauserlog$ = Mservice.loggingObservable;
      //dict
      this.Mservice.loggingObservable.subscribe(exp =>{
        if(exp.userSql.idusuario != undefined){
          this.experienciaSql.length = 0;
          this.detalleSql.length = 0;
          this.httpService.getExperiencia(exp.userSql.idusuario)
            //.subscribe(value=>{
                //this.experienciaSql = value;
                //console.log(this.experienciaSql)
            //})
            .forEach(x => {
              // console.log(x)
              if (x != undefined){
                x.forEach( exp =>{
                
                  this.experienciaSql.push(exp);
                  // console.log(this.experienciaSql)
                  this.httpService.getDetalle(exp.iddetalles)
                    .subscribe(det =>{
                      
                      this.detalleSql.push(det)
                      //console.log(det)
                    })
                })
              }else{
                console.log("experiencia no definida")
              }
            })
            // console.log(this.detalleSql);
        }else{      
          console.log("error atrapado");
        }
      });
      //  bloque que define el diccionario junto con la experiencia
      this.httpService.getTipo().subscribe(t =>{
        this.tipoSql = t
        //console.log(t[1])
        //  t.forEach(ti =>{
          // console.log(ti.idtipo.toString())
          //console.log(this.experienciaSql[0].tipo.toString()); 
        
          // if(ti.idtipo.toString() === this.experienciaSql[0].tipo.toString()){
          //     this.dict.add(ti.idtipo.toString(),this.experienciaSql[0])
          //   }
            
        //  })
               
      });
      //console.log(this.experienciaSql)
      console.log(this.dict)
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
          this.dataSql = value[1];
          //console.log(this.dataSql)
          this.Mservice.loggingObservableData = {userFireb: '', logging: true, userSql: this.dataSql};
        });
      }    
    })
    //carga de experiencia y otros componentes

    // this.Mservice.loggingObservable.subscribe(exp =>{
    //   if(exp.userSql.idusuario != undefined){
    //     this.experienciaSql.length = 0;
    //     this.detalleSql.length = 0;
    //     this.httpService.getExperiencia(exp.userSql.idusuario)
    //       //.subscribe(value=>{
    //           //this.experienciaSql = value;
    //           //console.log(this.experienciaSql)
    //       //})
    //       .forEach(x => {
    //         // console.log(x)
    //         if (x != undefined){
    //           x.forEach( exp =>{
              
    //             this.experienciaSql.push(exp);
    //             // console.log(this.experienciaSql)
    //             this.httpService.getDetalle(exp.iddetalles)
    //               .subscribe(det =>{
                    
    //                 this.detalleSql.push(det)
    //               })
    //           })
    //         }else{
    //           console.log("experiencia no definida")
    //         }
    //       })
    //       // console.log(this.detalleSql);
    //   }else{      
    //     console.log("error atrapado");
    //   }
    // })
    // //  bloque que define el diccionario junto con la experiencia
    // this.httpService.getTipo().subscribe(t =>{
    //   this.tipoSql = t
    //   t.forEach(type =>{
    //     // var key :String = type.descripcion
    //     // var dict ={};
    //     // this.experienciaTipo['primera'] = '';
    //     // dict= []
    //     // console.log(key)
    //     this.dict.add(type.idtipo.toString(),type.descripcion)
    //       if(type.idtipo.toString() === this.experienciaSql[0].tipo.toString()){
    //         this.dict.add(type.idtipo.toString(),this.experienciaSql[0])
    //       }
    
    //   })
    //   console.log(this.experienciaSql)
    //   console.log(this.dict)
    // });

  }

  logOut(){
    this.afAuth.signOut().then(()=>this.router.navigate(['/main']));
    console.log(this.Mservice.loggingObservable)
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

  cargarDic(t:tipo[],exp :experiencia[], dicci:DictionaryComponent){
    
    for (var ii in t){
      for (var i in exp){
        if (t[ii].idtipo.toString() === exp[i].tipo.toString()){
          dicci.add(t[ii].idtipo.toString(),exp[i])
          console.log(exp[i])
        }else{
        console.log(exp[i].tipo.toString())
        }
      }
    }   

  }
  

}

