import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


declare type Wrapper = {
  cover: boolean;
  show: boolean;
}

declare type Message = {
  action: string;
  text?: string;
  status?:string;
  timeout?:number;
}

declare type Button = {
  action: string;
}

@Injectable({providedIn: 'root'})
export class Form088YEventService {

  button:  Subject<Button>  = new Subject();
  wrapper: Subject<Wrapper> = new Subject();
  message: Subject<Message> = new Subject();

  constructor() {
  }

  clickButton(message) {
    this.button.next(message);
  }

  notifyWrapper(message) {
    this.wrapper.next(message);
  }

  showMessage(message) {
    this.message.next(message);
  }
}
