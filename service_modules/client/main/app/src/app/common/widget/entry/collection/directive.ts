import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[entry-host]',
})
export class EntryDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

