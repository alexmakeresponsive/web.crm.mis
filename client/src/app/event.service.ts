import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventService {

  skipClicked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  updateTicketJournalItem() {
    console.log('updateTicketJournalItem..');
    this.skipClicked.next(true);
  }
}
