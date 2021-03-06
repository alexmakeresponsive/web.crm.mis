import { Component,
  ViewChild, ElementRef, Renderer2, HostListener,
  OnInit, AfterViewInit, OnDestroy,
  Input
} from '@angular/core';

import {Form088YEventService} from "@MsaModule/service/event/form-088-y-event.service";

@Component({
  selector: 'form-088-y-wrapper',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class Form088yWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() payloadFromServer;

  @ViewChild('formWrapper', {static: false}) formWrapper: ElementRef;

  wrapperSubscriber;

  constructor(
    private renderer: Renderer2,
    private eventService: Form088YEventService
  ) { }

  cover() {
    this.renderer.setStyle(this.formWrapper.nativeElement, 'opacity', '0.5');
  }

  show() {
    this.renderer.setStyle(this.formWrapper.nativeElement, 'opacity', '1');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.wrapperSubscriber = this.eventService.wrapper.subscribe( message => {
      if(!message) {
        return;
      }

      if (message.cover) {
        this.cover();
      }

      if (message.show) {
        this.show();
      }
    });
  }

  ngOnDestroy() {
    this.wrapperSubscriber.unsubscribe();
  }
}
