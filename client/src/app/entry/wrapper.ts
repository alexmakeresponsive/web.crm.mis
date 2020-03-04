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
  @Input() data: EntryComponentConstructor;
  @ViewChild(EntryDirective, {static: true}) entryHost: EntryDirective;

  @Output() emitter:EventEmitter<any> = new EventEmitter();


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const viewContainerRef = this.entryHost.viewContainerRef;
          viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (<any>componentRef.instance).data       = this.data.data;
    (<any>componentRef.instance).parameters = this.data.parameters;

    if (componentRef.instance.hasOwnProperty('emitter')) {
      componentRef.instance.emitter.subscribe((data) => {
        this.emitter.emit(data);
      })
    }
  }
}

