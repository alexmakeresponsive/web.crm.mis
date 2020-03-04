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

  // fire from child component
  //
  //   @Output() emitter = new EventEmitter<any??>();
  // then set emiter for childcomponent and subscribe on it in here

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);

    // console.log(this.data.component);

    const viewContainerRef = this.entryHost.viewContainerRef;
          viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);

    (<any>componentRef.instance).data       = this.data.data;
    (<any>componentRef.instance).parameters = this.data.parameters;

    // console.log(componentRef.instance); // set instance to serviceStoraageData?

    // fire from child component
    //
    // componentRef.instance.emitter.subscribe((data) => {
    //    this.emitter.emit(data)
    // })

    // or
    // fire from parent component - ??
    //
    // setTimeout(() => {
    //   // console.log('EntryWrapper: getFormValue after time out: ', componentRef.instance.getFormValue()); - not working
    //   console.log('EntryWrapper: formData after time out: ', componentRef.instance.formData); - works!!
    // }, 7000)
  }

  // or
  // fire from parent component - ??
  //
  // fireMeFromParrentComponent() {
  //   // return componentRef.instance.getFormValue();
  // }

  // use https://angular.io/guide/component-interaction#parent-calls-an-viewchild
  fireMeFromParrentComponent() {
    console.log('fireMeFromParrentComponent!!');
    // console.log('EntryWrapper: formData after time out: ', componentRef.instance.formData); - works!!
  }
}

