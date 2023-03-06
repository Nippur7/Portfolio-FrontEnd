import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  logging: boolean;
  userFireb: any;
  userSql: any;
}

export interface Iexperience{
  
}

@Injectable({
  providedIn: 'root',
})
export class MasterserviceService {
  private logginObservablePrivate: BehaviorSubject<IUser> = 
    new BehaviorSubject<IUser>(
      { logging: false, userFireb: '', userSql: '' }
    );

    get loggingObservable(){
      return this.logginObservablePrivate.asObservable();
    }

    set loggingObservableData(data: IUser){
      this.logginObservablePrivate.next(data);
    }
}
