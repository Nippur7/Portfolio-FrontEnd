import { Component } from '@angular/core';
import { MasterserviceService } from './service/masterservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CV_Dinamic';

//  constructor(masterservice: MasterserviceService){
//    masterservice.loggingObservableData ={logging:true, user: 'pepito'}

//  }
  
}
