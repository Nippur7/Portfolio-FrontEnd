import { experiencia } from "./experiencia";
import { Ctipo } from "./tipo";

interface Dictionary {
    [key: string]: any[];
  }

export class DictionaryComponent {    
      
      
        private dictionary: Dictionary = {};
      
       add(key: string, value: any) {
          if (this.dictionary[key]) {
            this.dictionary[key].push(value);
          } else {
            this.dictionary[key] = [value];
          }
        }
      
        get(key: string): experiencia[] {
          return this.dictionary[key];
        }
     
        addArray(t: Ctipo[], e: experiencia[]){
          for (var i=0;i<t.length;i++){
            for (var ii=0;ii<e.length;ii++){
              // if (t[i].idtipo === e[ii].tipo){
                this.dictionary[t[i].descripcion].push(e[ii])
                //console.log(i)
              // }else{
              console.log(t[i].idtipo.toString())
              // }
            }
          }   
          //return this.dict;
        }
        
  }