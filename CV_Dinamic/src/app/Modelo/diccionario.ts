interface Dictionary {
    [key: string]: string[];
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
      
        get(key: string): string[] {
          return this.dictionary[key];
        }
     
      
  }