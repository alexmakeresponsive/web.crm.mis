import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';

import {EntryComponentConstructor} from "./constructor";
import { EntryDirective } from "./directive";



@Component({
  selector: 'entry-wrapper',
  template: `
              <div class="ad-banner-example">
                <ng-template entry-host></ng-template>
              </div>
            `
})
export class EntryWrapper implements OnInit {
  @Input() payload: any;   //MsaForm088yData type
  @Input() component: EntryComponentConstructor;
  @ViewChild(EntryDirective, {static: true}) entryHost: EntryDirective;

  @Output() emitterData:EventEmitter<any>     = new EventEmitter();
  @Output() emitterInstance:EventEmitter<any> = new EventEmitter();


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component.component);
    const viewContainerRef = this.entryHost.viewContainerRef;
          viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (<any>componentRef.instance).payload        = this.payload;  // payloadFromServer

    (<any>componentRef.instance).parameters     = this.component.parameters;
    (<any>componentRef.instance).data           = this.component.data;

    if (componentRef.instance.hasOwnProperty('emitter')) {
      componentRef.instance.emitter.subscribe((data) => {
        this.emitterData.emit(data);
      })
    }

    this.emitterInstance.emit(componentRef.instance);
  }
}

