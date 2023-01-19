import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  logging: boolean;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class MasterserviceService {
  private logginObservablePrivate: BehaviorSubject<IUser> = 
    new BehaviorSubject<IUser>(
      { logging: false, user: '' }
    );

    get loggingObservable(){
      return this.logginObservablePrivate.asObservable();
    }

    set loggingObservableData(data: IUser){
      this.logginObservablePrivate.next(data);
    }
}
