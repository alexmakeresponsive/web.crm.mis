import { Component, ViewChild, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

import {Form088YEventService} from "@MsaModule/service/event/form-088-y-event.service";

@Component({
  selector: 'form-088-y-button-box',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class Form088yButtonBoxComponent implements OnInit {
  @ViewChild('containerBtn', {static: false}) containerBtn: ElementRef;

  constructor(
    private renderer: Renderer2,
    private eventService: Form088YEventService
  ) { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (document.body.scrollTop <= 396 || document.documentElement.scrollTop <= 396) {
      const top = 246 + 150 + 30 - window.pageYOffset;
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (top + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

    if (document.body.scrollTop > 396 || document.documentElement.scrollTop > 396) {
      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', (30 + 'px'));
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', 'auto');
    }

    const bottomBreakpoint = document.body.clientHeight - window.innerHeight - 30;
    const bottom =  window.innerHeight + window.pageYOffset - document.body.clientHeight - 45 + 90;

    if ( document.body.scrollTop > (bottomBreakpoint)
      || document.documentElement.scrollTop > (bottomBreakpoint)) {

      this.renderer.setStyle(this.containerBtn.nativeElement, 'top', 'auto');
      this.renderer.setStyle(this.containerBtn.nativeElement, 'bottom', (bottom + 'px'));
    }
  }

  doSubmit() {
    this.eventService.clickButton({action: 'submit'});
  }

  doClear() {
    this.eventService.clickButton({action: 'reset'});
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  ngOnInit() {

  }
}
