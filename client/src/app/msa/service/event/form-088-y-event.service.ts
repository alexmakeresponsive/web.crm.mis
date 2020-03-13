import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


declare type Wrapper = {
  cover: boolean;
  show: boolean;
}

declare type Message = {
  text: string;
  status:string;
  timeout:number;
}


@Injectable({providedIn: 'root'})
export class Form088YEventService {

  submit: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reset:  BehaviorSubject<boolean> = new BehaviorSubject(false);

  wrapper: BehaviorSubject<Wrapper> = new BehaviorSubject(null);

  message: BehaviorSubject<Message> = new BehaviorSubject(null);

  constructor() {
  }

  submitForm() {
    this.submit.next(true);
  }

  resetForm() {
    this.reset.next(true);
  }

  notifyWrapper(message) {
    this.wrapper.next(message);
  }

  showMessage(message) {
    this.message.next(message);
  }
}
