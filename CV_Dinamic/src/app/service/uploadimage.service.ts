import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadimageService {
  public archivos: any = [];
  private base64Output : String | undefined;
  constructor() { }

  public async capturarFile(event: { target: { files: any; }; }):Promise<any> {
    const imagencapturada = event.target.files[0];
    //const prueba :any;
   // this.extraerBase64(imagencapturada).then((imagen : any) =>{
     // this.base64Output = imagen.base;
      //console.log(imagen.base)
     // console.log(this.base64Output)
      //return imagen.base;
      //console.log(imagen.base)
    //})
    const imagen :any = await this.extraerBase64(imagencapturada);
    this.base64Output = imagen.base;
    this.archivos.push(imagencapturada);
    return this.base64Output;
    //console.log(this.base64Output);
    //return this.base64Output;
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, _reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      //const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({ 
          base: reader.result
        });
      };
      reader.onerror = _error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      console.error(e);
      throw e;
    }
  })
}
