import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const viewContainerRef = this.entryHost.viewContainerRef;
          viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    console.log(this.data.data);

    (<any>componentRef.instance).items = this.data.data;
  }
}

