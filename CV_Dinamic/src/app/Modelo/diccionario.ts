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
     
        mod(t: string, i: number, data:any[]){
          //console.log(t,i,data)
          this.dictionary[t][i].detexp = data[2];
          this.dictionary[t][i].idexperiencia = data[0].idexperiencia;
          this.dictionary[t][i].lugar = data[0].lugar;
          this.dictionary[t][i].inicio = data[0].inicio;
          this.dictionary[t][i].fin = data[0].fin;
          this.dictionary[t][i].iddetalles = data[0].iddetalles;
          this.dictionary[t][i].tipo = data[0].tipo;
          this.dictionary[t][i].obs = data[0].obs;
          this.dictionary[t][i].iduser = data[0].iduser;

        }
        
  }