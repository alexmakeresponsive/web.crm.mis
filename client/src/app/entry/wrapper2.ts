import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';

import {EntryComponentConstructor} from "./constructor";
import { EntryDirective } from "./directive";



@Component({
  selector: 'entry-wrapper-2',
  template: `
                <ng-template entry-host></ng-template>
            `
})
export class EntryWrapper2 implements OnInit {
  @Input() data: EntryComponentConstructor;
  @Input() payload: any;
  @ViewChild(EntryDirective, {static: true}) entryHost: EntryDirective;

  @Output() emitterData:EventEmitter<any>     = new EventEmitter();
  @Output() emitterInstance:EventEmitter<any> = new EventEmitter();
  @Output() emitterAction:EventEmitter<any> = new EventEmitter();


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const viewContainerRef = this.entryHost.viewContainerRef;
          viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (<any>componentRef.instance).data       = this.data.data;
    (<any>componentRef.instance).parameters = this.data.parameters;
    (<any>componentRef.instance).payload    = this.payload;

    if (componentRef.instance.hasOwnProperty('emitterData')) {
      componentRef.instance.emitterData.subscribe((data) => {
        this.emitterData.emit(data);
      })
    }
    if (componentRef.instance.hasOwnProperty('emitterAction')) {
      componentRef.instance.emitterAction.subscribe((data) => {
        this.emitterAction.emit(data);
      })
    }

    if (componentRef.instance.hasOwnProperty('emitterAfterInit')) {
      componentRef.instance.emitterAfterInit.subscribe((data) => {
        this.emitterInstance.emit(componentRef.instance);
      })
    }
  }
}

